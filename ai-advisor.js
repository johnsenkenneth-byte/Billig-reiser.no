(function () {
  const $ = (id) => document.getElementById(id);
  const assistant = $("aiTravelAssistant");
  if (!assistant) return;
  assistant.dataset.ready = "advisor";

  const panel = $("aiChatPanel");
  const toggle = $("aiChatToggle");
  const close = $("aiChatClose");
  const stage = $("aiAdvisorStage");
  const recap = $("aiAdvisorRecap");
  const reset = $("aiAdvisorReset");
  const state = { destination: "", month: "", budget: "" };

  const profiles = {
    thailand: {
      label: "Thailand",
      flightTo: "Bangkok (BKK)",
      hotelTo: "Krabi",
      guide: "/reise-thailand.html",
      season: "November er en sterk måned for Thailand: mindre regn, grønn natur og bedre priser før juletrykket.",
      picks: [
        ["Bangkok + Krabi", "Best miks av storby, strand og enkel logistikk."],
        ["Koh Lanta", "Roligere, pent i november og bra verdi for par/familie."],
        ["Khao Lak", "Enkelt strandvalg med gode hoteller og mindre mas."]
      ]
    },
    spania: {
      label: "Spania",
      flightTo: "Malaga (AGP)",
      hotelTo: "Malaga",
      guide: "/spania/",
      season: "Spania er best på totalpris, kort flytid og mange direkteruter fra Norge.",
      picks: [
        ["Malaga", "God helårsdestinasjon med fly, hotell og mat til fornuftig pris."],
        ["Alicante", "Ofte rimelige fly og enkel strand/storby-kombinasjon."],
        ["Mallorca", "Sterkt valg for familie, strand og trygg logistikk."]
      ]
    },
    hellas: {
      label: "Hellas",
      flightTo: "Athen (ATH)",
      hotelTo: "Kreta",
      guide: "/hellas/",
      season: "Hellas er best fra vår til høst. Utenfor sesong passer Athen og større øyer best.",
      picks: [
        ["Kreta", "Mest fleksibelt: strand, mat, byer og gode hotellområder."],
        ["Rhodos", "Enkel solferie med mye charter og familievennlige hoteller."],
        ["Athen + øy", "Best hvis du vil kombinere kultur og kort øyhopp."]
      ]
    },
    danmark: {
      label: "Danmark",
      flightTo: "København (CPH)",
      hotelTo: "Billund",
      guide: "/sommerhus-bat-danmark.html",
      season: "Danmark passer best når reisen skal være enkel, familievennlig og uten stor flyrisiko.",
      picks: [
        ["Billund", "Legoland, Lalandia og korte avstander."],
        ["Sommerhus + båt", "Bra totalpakke når dere vil ha fleksibilitet."],
        ["København", "Trygt helgevalg med mat, hotell og opplevelser."]
      ]
    }
  };

  const monthMap = {
    januar: 0, februar: 1, mars: 2, april: 3, mai: 4, juni: 5,
    juli: 6, august: 7, september: 8, oktober: 9, november: 10, desember: 11
  };

  function normalize(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function clean(value) {
    return String(value || "").trim();
  }

  function escapeHtml(value) {
    return clean(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function profileFor(destination) {
    const key = normalize(destination);
    if (key.includes("thai") || key.includes("bangkok") || key.includes("phuket") || key.includes("krabi")) return profiles.thailand;
    if (key.includes("span") || key.includes("malaga") || key.includes("alicante") || key.includes("mallorca")) return profiles.spania;
    if (key.includes("hellas") || key.includes("gre") || key.includes("kreta") || key.includes("rhodos")) return profiles.hellas;
    if (key.includes("danmark") || key.includes("billund") || key.includes("kobenhavn") || key.includes("copenhagen")) return profiles.danmark;
    return {
      label: clean(destination) || "valgt reisemål",
      flightTo: clean(destination),
      hotelTo: clean(destination),
      guide: "/#travelSearch",
      season: "Jeg ville startet med totalpris: fly, hotell, transport og fleksibilitet sammen.",
      picks: [
        [clean(destination) || "Direkte søk", "Sjekk fly først, og bruk hotellområdet til å styre totalprisen."],
        ["Pakkereise", "Smart hvis du vil redusere risiko og få fly + hotell samlet."],
        ["Prisvarsel", "Sett makspris og vent på bedre timing."]
      ]
    };
  }

  function parseBudget(value) {
    const number = Number(String(value || "").replace(/[^\d]/g, ""));
    return Number.isFinite(number) && number > 0 ? number : 0;
  }

  function formatBudget(value) {
    const number = parseBudget(value);
    return number ? `${number.toLocaleString("nb-NO")} kr` : "fleksibelt";
  }

  function datesForMonth(month) {
    const normalized = normalize(month);
    const now = new Date();
    let monthIndex = Object.entries(monthMap).find(([name]) => normalized.includes(name))?.[1];
    if (monthIndex == null) monthIndex = (now.getMonth() + 2) % 12;
    let year = now.getFullYear();
    if (monthIndex < now.getMonth()) year += 1;
    const depart = new Date(year, monthIndex, 10, 12, 0, 0);
    const ret = new Date(year, monthIndex, 20, 12, 0, 0);
    return {
      depart: depart.toISOString().slice(0, 10),
      ret: ret.toISOString().slice(0, 10)
    };
  }

  function setValue(id, value) {
    const element = $(id);
    if (!element) return;
    element.value = value || "";
    element.dispatchEvent(new Event("input", { bubbles: true }));
    element.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function setSearchType(type) {
    const button = document.querySelector(`[data-search-type="${type}"], [data-smart-service="${type}"]`);
    if (button) button.click();
  }

  function openPanel(manual = true) {
    if (!panel) return;
    panel.hidden = false;
    assistant.classList.add("open");
    if (manual) {
      try { sessionStorage.setItem("brAiPopupSeen", "1"); } catch (error) {}
    }
    render();
  }

  function closePanel() {
    if (panel) panel.hidden = true;
    assistant.classList.remove("open");
    try { sessionStorage.setItem("brAiPopupSeen", "1"); } catch (error) {}
  }

  function progressHtml(step) {
    return `<div class="ai-advisor-progress" aria-label="Reiserådgiver steg">
      ${["Hvor", "Når", "Budsjett", "Forslag"].map((label, index) => `<span class="${index <= step ? "is-active" : ""}">${label}</span>`).join("")}
    </div>`;
  }

  function renderRecap() {
    if (!recap) return;
    const parts = [
      state.destination ? `Til: ${state.destination}` : "Velg reisemål",
      state.month ? `Når: ${state.month}` : "Velg tid",
      state.budget ? `Budsjett: ${formatBudget(state.budget)}` : "Sett budsjett"
    ];
    recap.innerHTML = parts.map((part) => `<span>${escapeHtml(part)}</span>`).join("");
  }

  function button(value, label = value) {
    return `<button class="ai-advisor-option" type="button" data-ai-value="${escapeHtml(value)}">${escapeHtml(label)}</button>`;
  }

  function inputStep(question, lead, options, placeholder, valueName, nextLabel) {
    return `<div class="ai-advisor-step">
      <h3>${escapeHtml(question)}</h3>
      <p>${escapeHtml(lead)}</p>
      <div class="ai-advisor-options">${options.map((item) => Array.isArray(item) ? button(item[0], item[1]) : button(item)).join("")}</div>
      <form class="ai-advisor-input-row" data-ai-custom="${valueName}">
        <input value="" autocomplete="off" placeholder="${escapeHtml(placeholder)}">
        <button type="submit">${escapeHtml(nextLabel)}</button>
      </form>
    </div>`;
  }

  function render() {
    if (!stage) return;
    renderRecap();
    if (!state.destination) {
      stage.innerHTML = progressHtml(0) + inputStep(
        "Hvor vil du?",
        "Velg et sted, eller skriv noe mer åpent.",
        ["Thailand", "Spania", "Hellas", "Danmark", ["Vet ikke", "Overrask meg"]],
        "Skriv reisemål",
        "destination",
        "Neste"
      );
      return;
    }
    if (!state.month) {
      stage.innerHTML = progressHtml(1) + inputStep(
        "Når vil du reise?",
        "Jeg bruker måneden til å vurdere sesong og sette forslagene i riktig retning.",
        ["November", "Desember", "Januar", "Påske", "Sommer", "Fleksibel"],
        "Skriv måned eller periode",
        "month",
        "Neste"
      );
      return;
    }
    if (!state.budget) {
      stage.innerHTML = progressHtml(2) + inputStep(
        "Hva er budsjettet?",
        "Skriv totalrammen du tenker på. Jeg bruker den til å prioritere realistiske valg.",
        [["8000", "8 000 kr"], ["15000", "15 000 kr"], ["25000", "25 000 kr"], ["40000", "40 000 kr"], ["fleksibelt", "Fleksibelt"]],
        "F.eks. 15000",
        "budget",
        "Vis forslag"
      );
      return;
    }
    renderResults();
  }

  function budgetAdvice(profile, budget) {
    if (!budget) return "Med fleksibelt budsjett ville jeg valgt etter reisetid og hotellområde først.";
    if (profile === profiles.thailand) {
      if (budget < 12000) return "Stramt for Thailand hvis fly og hotell skal med. Sett prisvarsel og vær fleksibel på dato.";
      if (budget <= 18000) return "Realistisk hvis du prioriterer gode flydager, 3-4 stjerners hotell og ett strandområde.";
      return "God ramme for bedre hotell, færre kompromisser og mer komfortabel reiserute.";
    }
    if (budget < 8000) return "Stramt, men mulig med kortreise, lavsesong og enkel standard.";
    if (budget <= 16000) return "Bra ramme for en smart pakkereise eller fly + hotell med kontroll på totalpris.";
    return "Gir rom for bedre hotellområde og færre kompromisser.";
  }

  function fillSearch(type = "flight") {
    const profile = profileFor(state.destination);
    const dates = datesForMonth(state.month);
    setSearchType(type);
    if (type === "hotel") {
      setValue("toCity", profile.hotelTo || profile.label);
      setValue("fromCity", "");
      setValue("rooms", "1");
    } else if (type === "package") {
      setValue("fromCity", "Oslo (OSL)");
      setValue("toCity", profile.flightTo || profile.label);
    } else {
      setValue("fromCity", "Oslo (OSL)");
      setValue("toCity", profile.flightTo || profile.label);
    }
    setValue("departDate", dates.depart);
    setValue("returnDate", dates.ret);
    setValue("adults", "2");
    setValue("children", "0");
    document.getElementById("travelSearch")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function openFlightSearch() {
    const profile = profileFor(state.destination);
    const dates = datesForMonth(state.month);
    const data = {
      from: "Oslo (OSL)",
      to: profile.flightTo || profile.label,
      depart: dates.depart,
      ret: dates.ret,
      adults: "2",
      children: "0",
      childAges: [],
      tripType: "roundtrip"
    };
    if (typeof window.BR_buildMomondoFlightUrl === "function") {
      window.open(window.BR_buildMomondoFlightUrl(data), "_blank", "noopener,noreferrer");
      return;
    }
    fillSearch("flight");
  }

  function showHotels() {
    const profile = profileFor(state.destination);
    fillSearch("hotel");
    if (typeof window.BR_showHotelResults === "function") {
      const dates = datesForMonth(state.month);
      window.BR_showHotelResults({
        to: profile.hotelTo || profile.label,
        depart: dates.depart,
        ret: dates.ret,
        adults: "2",
        children: "0",
        rooms: "1",
        childAges: []
      }, { scroll: true });
    }
  }

  function openPriceAlert() {
    document.querySelector("[data-br-alerts]")?.click();
    const profile = profileFor(state.destination);
    setTimeout(() => {
      const target = document.getElementById("brAlertTo");
      const price = document.querySelector("[name='targetPrice']");
      if (target) target.value = profile.flightTo || profile.label;
      if (price && parseBudget(state.budget)) price.value = String(parseBudget(state.budget));
    }, 150);
  }

  function renderResults() {
    const profile = profileFor(state.destination);
    const budget = parseBudget(state.budget);
    const cards = profile.picks.map(([title, body]) => `<article class="ai-advisor-card"><b>${escapeHtml(title)}</b><span>${escapeHtml(body)}</span></article>`).join("");
    stage.innerHTML = progressHtml(3) + `<div class="ai-advisor-results">
      <span class="ai-advisor-kicker">Min anbefaling</span>
      <h3>${escapeHtml(profile.label)} i ${escapeHtml(state.month)}</h3>
      <p>${escapeHtml(profile.season)}</p>
      <p>${escapeHtml(budgetAdvice(profile, budget))}</p>
      <div class="ai-advisor-cards">${cards}</div>
      <div class="ai-advisor-actions">
        <button type="button" data-ai-action="fill-flight">Fyll flysøk</button>
        <button type="button" data-ai-action="open-flight">Åpne flysøk</button>
        <button type="button" data-ai-action="hotels">Hotellforslag</button>
        <button type="button" data-ai-action="price-alert">Sett prisvarsel</button>
      </div>
      <a class="ai-advisor-guide" href="${escapeHtml(profile.guide)}">Les guide for ${escapeHtml(profile.label)}</a>
    </div>`;
  }

  function choose(value) {
    const cleanValue = clean(value);
    if (!state.destination) {
      state.destination = cleanValue === "Vet ikke" ? "Spania" : cleanValue;
    } else if (!state.month) {
      state.month = cleanValue;
    } else if (!state.budget) {
      state.budget = cleanValue;
    }
    render();
  }

  toggle?.addEventListener("click", () => openPanel(true));
  close?.addEventListener("click", closePanel);
  reset?.addEventListener("click", () => {
    state.destination = "";
    state.month = "";
    state.budget = "";
    render();
  });

  stage?.addEventListener("click", (event) => {
    const option = event.target.closest("[data-ai-value]");
    const action = event.target.closest("[data-ai-action]");
    if (option) choose(option.dataset.aiValue);
    if (action?.dataset.aiAction === "fill-flight") fillSearch("flight");
    if (action?.dataset.aiAction === "open-flight") openFlightSearch();
    if (action?.dataset.aiAction === "hotels") showHotels();
    if (action?.dataset.aiAction === "price-alert") openPriceAlert();
  });

  stage?.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-ai-custom]");
    if (!form) return;
    event.preventDefault();
    const input = form.querySelector("input");
    if (input?.value.trim()) choose(input.value);
  });
})();
