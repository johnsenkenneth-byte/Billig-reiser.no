(function () {
  const APP_VERSION = "v225-app-polish";
  const KEY_FAV = "br_app_favorites_v1";
  const KEY_REC = "br_app_recent_v1";
  const KEY_PRICE = "br_app_price_alerts_v1";
  const KEY_PUSH = "br_app_push_subscription_v1";
  const KEY_EMAIL = "br_app_alert_email_v1";
  const KEY_LAUNCH = "br_app_launch_seen_v1";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const get = (key, fallback = []) => {
    try {
      return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
    } catch (error) {
      return fallback;
    }
  };
  const set = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const text = (value) => String(value == null ? "" : value);
  const escapeHtml = (value) => text(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
  const cleanTitle = (value) => (value || "Billig Reiser")
    .replace(/\s*\|\s*Billig.*$/i, "")
    .replace(/\s*-\s*Billig.*$/i, "")
    .trim() || "Billig Reiser";
  const page = {
    title: cleanTitle($("h1")?.textContent || document.title),
    url: `${location.pathname || "/"}${location.search || ""}${location.hash || ""}`,
    time: Date.now()
  };

  function appUrl(value) {
    const raw = text(value).trim() || "/";
    if (raw.startsWith("http://") || raw.startsWith("https://")) {
      try {
        const url = new URL(raw);
        return url.origin === location.origin ? `${url.pathname}${url.search}${url.hash}` : "/";
      } catch (error) {
        return "/";
      }
    }
    return raw.startsWith("/") ? raw : `/${raw.replace(/^\/+/, "")}`;
  }

  function toast(message) {
    const node = $(".br-app-toast") || document.body.appendChild(Object.assign(document.createElement("div"), { className: "br-app-toast" }));
    node.textContent = message;
    node.classList.add("is-visible");
    clearTimeout(node._timer);
    node._timer = setTimeout(() => node.classList.remove("is-visible"), 2600);
  }

  function haptic(type = "tap") {
    const pattern = type === "success" ? [12, 34, 18] : type === "warning" ? [24, 28, 24] : 10;
    const haptics = window.Capacitor?.Plugins?.Haptics || window.Capacitor?.Plugins?.Haptic;
    if (haptics?.impact) {
      haptics.impact({ style: type === "success" ? "medium" : "light" }).catch(() => {});
      return;
    }
    if (haptics?.notification && type === "success") {
      haptics.notification({ type: "success" }).catch(() => {});
      return;
    }
    if (navigator.vibrate) navigator.vibrate(pattern);
  }

  function absoluteShareUrl(value = page.url) {
    try {
      return new URL(appUrl(value), location.origin).toString();
    } catch (error) {
      return location.href;
    }
  }

  async function sharePayload(payload = {}) {
    const data = {
      title: payload.title || page.title || "Billig Reiser",
      text: payload.text || "Sjekk dette reisemålet hos Billig-Reiser.no",
      url: payload.url || location.href
    };
    haptic("tap");
    if (navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch (error) {
        if (error?.name === "AbortError") return;
      }
    }
    const textToCopy = `${data.title}\n${data.url}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast("Lenke kopiert");
    } catch (error) {
      toast("Deling er ikke tilgjengelig her");
    }
  }

  function shareFromElement(element) {
    const title = element.dataset.shareTitle || page.title;
    const shareUrl = element.dataset.shareUrl || page.url;
    const shareText = element.dataset.shareText || `Sjekk ${title} hos Billig-Reiser.no`;
    return sharePayload({ title, text: shareText, url: absoluteShareUrl(shareUrl) });
  }

  function showLaunchScreen() {
    const launch = $("[data-br-launch]");
    if (!launch) return;
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    let seen = "";
    try { seen = sessionStorage.getItem(KEY_LAUNCH); } catch (error) {}
    if (seen && !isStandalone()) {
      launch.remove();
      return;
    }
    try { sessionStorage.setItem(KEY_LAUNCH, "1"); } catch (error) {}
    const duration = reducedMotion ? 180 : 980;
    window.setTimeout(() => {
      launch.classList.add("is-done");
      window.setTimeout(() => launch.remove(), reducedMotion ? 80 : 380);
    }, duration);
  }

  function showSearchLoading(message = "Søker etter reiser") {
    const loader = $("[data-br-loader]");
    if (!loader) return;
    const label = loader.querySelector("[data-br-loader-label]");
    if (label) label.textContent = message;
    loader.hidden = false;
    requestAnimationFrame(() => loader.classList.add("is-visible"));
    clearTimeout(loader._timer);
    loader._timer = setTimeout(() => hideSearchLoading(), 4200);
  }

  function hideSearchLoading() {
    const loader = $("[data-br-loader]");
    if (!loader) return;
    loader.classList.remove("is-visible");
    clearTimeout(loader._timer);
    loader._timer = setTimeout(() => { loader.hidden = true; }, 220);
  }

  function animateFavorite(added) {
    const button = $(".br-app-fab");
    if (!button || !added) return;
    button.classList.remove("is-bursting");
    void button.offsetWidth;
    button.classList.add("is-bursting");
    setTimeout(() => button.classList.remove("is-bursting"), 780);
  }

  function upsertRecent() {
    const recent = get(KEY_REC).filter((item) => appUrl(item.url) !== appUrl(page.url));
    recent.unshift(page);
    set(KEY_REC, recent.slice(0, 10));
  }

  function isSaved() {
    return get(KEY_FAV).some((item) => appUrl(item.url) === appUrl(page.url));
  }

  function toggleFav() {
    let favorites = get(KEY_FAV);
    const wasSaved = favorites.some((item) => appUrl(item.url) === appUrl(page.url));
    if (wasSaved) {
      favorites = favorites.filter((item) => appUrl(item.url) !== appUrl(page.url));
      toast("Fjernet fra lagrede reiser");
    } else {
      favorites.unshift(page);
      toast("Lagt til i favoritter");
    }
    set(KEY_FAV, favorites.slice(0, 50));
    updateFavButton();
    animateFavorite(!wasSaved);
    haptic(wasSaved ? "tap" : "success");
    renderDrawer();
  }

  function updateFavButton() {
    const button = $(".br-app-fab");
    if (!button) return;
    const saved = isSaved();
    button.classList.toggle("is-saved", saved);
    button.textContent = saved ? "Lagret" : "Legg til";
    button.setAttribute("aria-pressed", saved ? "true" : "false");
    button.setAttribute("aria-label", saved ? "Fjern fra favoritter" : "Legg til i favoritter");
  }

  function itemHtml(item, removable) {
    const url = appUrl(item.url);
    return `<a class="br-app-item" href="${escapeHtml(url)}"><div><b>${escapeHtml(item.title || "Billig Reiser")}</b><span>${escapeHtml(url)}</span></div>${removable ? `<button type="button" data-remove-fav="${escapeHtml(url)}" aria-label="Fjern">x</button>` : ""}</a>`;
  }

  function priceAlertHtml(item) {
    const route = `${item.from || "OSL"} -> ${item.to || "valgfritt reisemal"}`;
    const target = Number(item.targetPrice || 0);
    const price = target ? `${target.toLocaleString("nb-NO")} kr` : "Ingen makspris";
    return `<article class="br-app-alert-item"><div><b>${escapeHtml(route)}</b><span>${escapeHtml(price)} · ${escapeHtml(item.email || "uten e-post")}</span></div><button type="button" data-remove-price-alert="${escapeHtml(item.id)}" aria-label="Fjern prisvarsel">x</button></article>`;
  }

  function isStandalone() {
    return window.matchMedia?.("(display-mode: standalone)")?.matches || window.navigator.standalone === true;
  }

  function supportsPush() {
    return "Notification" in window && "serviceWorker" in navigator && "PushManager" in window;
  }

  function updateAppStatus() {
    const install = $("#brInstallState");
    const push = $("#brPushState");
    const native = $("#brNativeState");
    if (install) install.textContent = isStandalone() ? "Installert appvisning" : "Klar for installasjon";
    if (native) native.textContent = isStandalone() ? "Standalone/native foelelse aktiv" : "Aapnes i nettleser til den installeres";
    if (!push) return;
    if (!("Notification" in window)) {
      push.textContent = "Push stottes ikke i denne nettleseren";
    } else if (Notification.permission === "granted") {
      push.textContent = get(KEY_PUSH, null)?.endpoint ? "Push-varsler aktivert" : "Varsler tillatt, serverkobling mangler";
    } else if (Notification.permission === "denied") {
      push.textContent = "Push-varsler er blokkert i nettleseren";
    } else {
      push.textContent = "Push-varsler ikke aktivert";
    }
  }

  function renderDrawer() {
    const favorites = get(KEY_FAV);
    const recent = get(KEY_REC);
    const alerts = get(KEY_PRICE);
    const fav = $("#brAppFavList");
    const rec = $("#brAppRecentList");
    const alertList = $("#brPriceAlertList");
    if (fav) fav.innerHTML = favorites.length ? favorites.map((item) => itemHtml(item, true)).join("") : '<p class="br-app-empty">Ingen lagrede reiser ennaa. Trykk Lagre paa en side du vil tilbake til.</p>';
    if (rec) rec.innerHTML = recent.length ? recent.map((item) => itemHtml(item, false)).join("") : '<p class="br-app-empty">Nylig viste sider kommer her.</p>';
    if (alertList) alertList.innerHTML = alerts.length ? alerts.map(priceAlertHtml).join("") : '<p class="br-app-empty">Ingen prisvarsler ennå.</p>';
    updateAppStatus();
  }

  function openDrawer(target = "") {
    $(".br-app-drawer")?.classList.add("is-open");
    renderDrawer();
    if (target) setTimeout(() => document.getElementById(target)?.scrollIntoView({ block: "start", behavior: "smooth" }), 80);
  }

  function closeDrawer() {
    $(".br-app-drawer")?.classList.remove("is-open");
  }

  function scrollSearch() {
    const search = $("#travelSearch") || $(".travel-search") || $(".search-card");
    if (search) {
      search.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      location.href = "/#travelSearch";
    }
  }

  function openAiAssistant() {
    const toggle = $("#aiChatToggle");
    if (toggle) {
      toggle.click();
      return;
    }
    location.href = "/#aiTravelAssistant";
  }

  let deferredPrompt = null;
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    $$("[data-br-install]").forEach((button) => { button.hidden = false; });
    updateAppStatus();
  });

  async function installApp() {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice.catch(() => {});
      deferredPrompt = null;
      updateAppStatus();
      return;
    }
    toast(/iphone|ipad|ipod/i.test(navigator.userAgent) ? "iPhone: Del -> Legg til paa Hjem-skjerm" : "Bruk nettleserens installer app-meny");
  }

  function budgetCalc() {
    const budget = Number($("#brBudget")?.value || 0);
    const people = Number($("#brPeople")?.value || 1);
    const type = $("#brTripType")?.value || "reise";
    const output = $("#brBudgetResult");
    if (!output) return;
    if (!budget) {
      output.textContent = "Skriv inn budsjettet ditt først.";
      return;
    }
    const per = Math.round(budget / Math.max(people, 1));
    output.textContent = `${budget.toLocaleString("nb-NO")} kr totalt gir ca. ${per.toLocaleString("nb-NO")} kr per person til ${type}.`;
  }

  function formValue(id, fallback = "") {
    return text(document.getElementById(id)?.value || fallback).trim();
  }

  function prefillPriceAlert() {
    const email = localStorage.getItem(KEY_EMAIL) || "";
    const from = formValue("fromCity", "Oslo (OSL)");
    const to = formValue("toCity", "");
    const emailInput = $("#brAlertEmail");
    const fromInput = $("#brAlertFrom");
    const toInput = $("#brAlertTo");
    if (emailInput && !emailInput.value) emailInput.value = email;
    if (fromInput && !fromInput.value) fromInput.value = from;
    if (toInput && !toInput.value) toInput.value = to;
  }

  async function submitPriceAlert(form) {
    const formData = new FormData(form);
    const email = text(formData.get("email")).trim().toLowerCase();
    const alert = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      email,
      from: text(formData.get("from") || "OSL").trim(),
      to: text(formData.get("to") || "").trim(),
      targetPrice: Number(formData.get("targetPrice") || 0),
      depart: text(formData.get("depart") || formValue("departDate")).trim(),
      returnDate: text(formData.get("returnDate") || formValue("returnDate")).trim(),
      page: location.href,
      appVersion: APP_VERSION,
      pushSubscription: get(KEY_PUSH, null),
      createdAt: new Date().toISOString()
    };

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast("Skriv inn en gyldig e-postadresse");
      return;
    }
    if (!alert.to) {
      toast("Skriv inn reisemal");
      return;
    }
    localStorage.setItem(KEY_EMAIL, email);

    const button = form.querySelector("button[type='submit']");
    const status = $("#brPriceAlertStatus");
    const original = button?.textContent || "Sett prisvarsel";
    if (button) {
      button.disabled = true;
      button.textContent = "Lagrer...";
    }
    if (status) status.textContent = "Lagrer prisvarsel...";

    let serverOk = false;
    try {
      const response = await fetch("/api/price-alert-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alert)
      });
      const data = await response.json().catch(() => ({}));
      serverOk = response.ok && data.success !== false;
      if (!serverOk && data.message) throw new Error(data.message);
    } catch (error) {
      if (status) status.textContent = error?.message || "Serverkobling mangler. Varselet lagres lokalt.";
    } finally {
      const alerts = get(KEY_PRICE).filter((item) => item.id !== alert.id);
      alerts.unshift(alert);
      set(KEY_PRICE, alerts.slice(0, 20));
      if (status && serverOk) status.textContent = "Prisvarsel er lagret.";
      if (button) {
        button.disabled = false;
        button.textContent = original;
      }
      form.reset();
      renderDrawer();
      toast(serverOk ? "Prisvarsel aktivert" : "Prisvarsel lagret lokalt");
    }
  }

  function urlBase64ToUint8Array(value) {
    const padding = "=".repeat((4 - (value.length % 4)) % 4);
    const base64 = (value + padding).replace(/-/g, "+").replace(/_/g, "/");
    const raw = window.atob(base64);
    return Uint8Array.from([...raw].map((char) => char.charCodeAt(0)));
  }

  async function fetchPushConfig() {
    const response = await fetch("/api/push-config", { cache: "no-store" });
    if (!response.ok) return {};
    return response.json();
  }

  async function enablePush() {
    try {
      if (!supportsPush()) {
        toast("Push krever installert appvisning og en nettleser som stotter Web Push");
        updateAppStatus();
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        toast("Push-varsler ble ikke aktivert");
        updateAppStatus();
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      const config = await fetchPushConfig().catch(() => ({}));
      let subscription = await registration.pushManager.getSubscription();

      if (!subscription && config.publicKey) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(config.publicKey)
        });
      }

      if (subscription) {
        const payload = {
          subscription: subscription.toJSON(),
          page: location.href,
          appVersion: APP_VERSION,
          createdAt: new Date().toISOString()
        };
        set(KEY_PUSH, payload.subscription);
        await fetch("/api/push-subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }).catch(() => {});
        toast("Push-varsler er aktivert");
      } else {
        toast("Varsler er tillatt. Legg inn VAPID_PUBLIC_KEY for server-push.");
      }
    } catch (error) {
      toast(error?.message || "Kunne ikke aktivere push-varsler");
    }
    updateAppStatus();
  }

  async function sendLocalNotification() {
    if (!("Notification" in window)) {
      toast("Nettleseren stotter ikke varsler");
      return;
    }
    const permission = Notification.permission === "granted" ? "granted" : await Notification.requestPermission();
    if (permission !== "granted") {
      toast("Varsler er ikke tillatt");
      return;
    }
    const registration = await navigator.serviceWorker.ready.catch(() => null);
    const options = {
      body: "Prisvarsler og lagrede reiser er klare i appen.",
      icon: "/assets/app-icon-192.png",
      badge: "/favicon-96x96.png",
      data: { url: "/#reisevarsel" }
    };
    if (registration?.showNotification) {
      await registration.showNotification("Billig Reiser", options);
    } else {
      new Notification("Billig Reiser", options);
    }
    updateAppStatus();
  }

  function appShell() {
    return `
      <div class="br-launch-screen" data-br-launch aria-hidden="true">
        <div class="br-launch-mark">
          <img src="/assets/billig-reiser-logo-full-v116.png" alt="">
        </div>
      </div>
      <div class="br-search-loader" data-br-loader hidden aria-live="polite" aria-label="Søk pågår">
        <div class="br-search-loader-card">
          <img src="/assets/app-icon-192.png" alt="">
          <strong data-br-loader-label>Søker etter reiser</strong>
          <span></span>
        </div>
      </div>
      <button class="br-app-fab" type="button" data-br-fav aria-pressed="false" aria-label="Legg til i favoritter">Legg til</button>
      <nav class="br-app-nav" aria-label="Appmeny">
        <a href="/"><strong>⌂</strong>Hjem</a>
        <button type="button" data-br-search><strong>⌕</strong>Søk</button>
        <button type="button" data-br-alerts><strong>!</strong>Varsler</button>
        <button type="button" data-br-ai><strong>AI</strong>Hjelp</button>
        <button type="button" data-br-open><strong>★</strong>Lagret</button>
      </nav>
      <div class="br-app-drawer" role="dialog" aria-modal="true" aria-label="Billig Reiser app">
        <section class="br-app-panel">
          <div class="br-app-head">
            <div>
              <h2>Billig Reiser app</h2>
              <p>Favoritter, prisvarsler, offline-modus og installerbar appflate.</p>
            </div>
            <button class="br-app-close" type="button" data-br-close aria-label="Lukk">x</button>
          </div>

          <div class="br-app-section" id="brAppStatus">
            <h3>Appstatus</h3>
            <div class="br-app-status-grid">
              <span id="brInstallState">Klar for installasjon</span>
              <span id="brNativeState">Standalone sjekkes...</span>
              <span id="brPushState">Push-varsler ikke aktivert</span>
            </div>
            <div class="br-app-actions">
              <button class="br-app-action is-secondary" type="button" data-br-share data-share-title="${escapeHtml(page.title)}" data-share-url="${escapeHtml(page.url)}">Del siden</button>
              <button class="br-app-action" type="button" data-br-install>Installer appen</button>
              <button class="br-app-action is-secondary" type="button" data-br-push>Aktiver push</button>
              <button class="br-app-action is-secondary" type="button" data-br-test-notification>Test varsel</button>
            </div>
            <p class="br-app-tip">På iPhone må appen legges på Hjem-skjerm før Web Push fungerer stabilt.</p>
          </div>

          <div class="br-app-section" id="brAppAlerts">
            <h3>Prisvarsler</h3>
            <form class="br-app-price" data-br-price-form>
              <input id="brAlertEmail" name="email" inputmode="email" autocomplete="email" placeholder="E-post">
              <input id="brAlertFrom" name="from" placeholder="Fra, f.eks. OSL">
              <input id="brAlertTo" name="to" placeholder="Til, f.eks. Bangkok">
              <input name="targetPrice" inputmode="numeric" placeholder="Makspris i kr">
              <button type="submit">Sett prisvarsel</button>
            </form>
            <p class="br-app-tip" id="brPriceAlertStatus">Prisvarsler sendes til API/webhook og lagres lokalt i appen.</p>
            <div class="br-app-list" id="brPriceAlertList"></div>
          </div>

          <div class="br-app-section">
            <h3>Lagrede reiser</h3>
            <div class="br-app-list" id="brAppFavList"></div>
          </div>

          <div class="br-app-section">
            <h3>Nylig sett</h3>
            <div class="br-app-list" id="brAppRecentList"></div>
          </div>

          <div class="br-app-section">
            <h3>Reisebudsjett</h3>
            <div class="br-app-budget">
              <input id="brBudget" inputmode="numeric" placeholder="Budsjett i kr">
              <input id="brPeople" inputmode="numeric" value="2" aria-label="Antall personer">
              <select id="brTripType">
                <option>fly og hotell</option>
                <option>charter</option>
                <option>storbytur</option>
                <option>Thailand-reise</option>
              </select>
              <button type="button" data-br-budget>Regn ut</button>
            </div>
            <div class="br-app-result" id="brBudgetResult"></div>
          </div>
        </section>
      </div>`;
  }

  function bindEvents() {
    document.addEventListener("pointerdown", (event) => {
      const pendingSearch = event.target.closest("#searchSubmitButton,.search-launch,#flightCta,#hotelCta,#activityCta,#packageCta,.hack-card-actions a,.route-hack-card a");
      if (!pendingSearch || pendingSearch.closest("[data-br-share]")) return;
      const label = pendingSearch.textContent?.toLowerCase().includes("hotell") ? "Åpner hotellforslag" : "Sjekker flypris";
      showSearchLoading(label);
    }, { passive: true });

    document.addEventListener("click", (event) => {
      const removeFav = event.target.closest("[data-remove-fav]");
      const removeAlert = event.target.closest("[data-remove-price-alert]");
      const share = event.target.closest("[data-br-share]");
      const interactive = event.target.closest("button,a,input,select,[role='button'],[data-route-card]");
      if (interactive) haptic(interactive.closest("[data-br-fav]") ? "success" : "tap");
      if (removeFav) {
        event.preventDefault();
        set(KEY_FAV, get(KEY_FAV).filter((item) => appUrl(item.url) !== appUrl(removeFav.dataset.removeFav)));
        renderDrawer();
        updateFavButton();
        toast("Fjernet");
        return;
      }
      if (removeAlert) {
        event.preventDefault();
        set(KEY_PRICE, get(KEY_PRICE).filter((item) => item.id !== removeAlert.dataset.removePriceAlert));
        renderDrawer();
        toast("Prisvarsel fjernet");
        return;
      }
      if (share) {
        event.preventDefault();
        shareFromElement(share);
        return;
      }
      const outbound = event.target.closest("a[target='_blank']");
      if (outbound && outbound.href && !outbound.closest("[data-br-share]")) {
        showSearchLoading(outbound.textContent?.toLowerCase().includes("hotell") ? "Åpner hotellforslag" : "Sjekker flypris");
      }
      if (event.target.closest("[data-br-fav]")) toggleFav();
      if (event.target.closest("[data-br-open]")) openDrawer();
      if (event.target.closest("[data-br-alerts]")) openDrawer("brAppAlerts");
      if (event.target.closest("[data-br-close]") || event.target.classList.contains("br-app-drawer")) closeDrawer();
      if (event.target.closest("[data-br-search]")) scrollSearch();
      if (event.target.closest("[data-br-ai]")) openAiAssistant();
      if (event.target.closest("[data-br-budget]")) budgetCalc();
      if (event.target.closest("[data-br-install]")) installApp();
      if (event.target.closest("[data-br-push]")) enablePush();
      if (event.target.closest("[data-br-test-notification]")) sendLocalNotification();
    });

    document.addEventListener("submit", (event) => {
      if (event.target.closest("#travelSearch")) {
        showSearchLoading("Søker etter reiser");
      }
      const form = event.target.closest("[data-br-price-form]");
      if (!form) return;
      event.preventDefault();
      submitPriceAlert(form);
    });

    window.addEventListener("appinstalled", () => {
      toast("Appen er installert");
      updateAppStatus();
    });
  }

  function init() {
    if (document.querySelector("[data-disable-app-features]")) return;
    upsertRecent();
    document.body.insertAdjacentHTML("beforeend", appShell());
    bindEvents();
    showLaunchScreen();
    updateFavButton();
    renderDrawer();
    prefillPriceAlert();
    setInterval(updateAppStatus, 15000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
