const CACHE_VERSION = "billig-reiser-pwa-v225-app-polish";
const APP_SHELL = [
  "/",
  "/index.html",
  "/sommerhus-bat-danmark.html",
  "/reisehacks.html",
  "/reisemagasinet.html",
  "/reiseradar.html",
  "/hellas/",
  "/hellas/kreta/",
  "/hellas/rhodos/",
  "/hellas/kos/",
  "/hellas/santorini/",
  "/hellas/korfu/",
  "/hellas/zakynthos/",
  "/hellas/mykonos/",
  "/hellas/naxos/",
  "/hellas/paros/",
  "/hellas/athen/",
  "/offline.html",
  "/manifest.webmanifest",
  "/favicon.ico",
  "/favicon.png",
  "/favicon-48x48.png",
  "/favicon-96x96.png",
  "/favicon-192x192.png",
  "/favicon-512x512.png",
  "/apple-touch-icon.png",
  "/go/hotels.html",
  "/style.css?v=225",
  "/app-features.css",
  "/app-features.css?v=159",
  "/app-features.css?v=221",
  "/app-features.css?v=225",
  "/app-features.js?v=221",
  "/app-features.js?v=225",
  "/ai-advisor.js?v=225",
  "/affiliate-config.js?v=206",
  "/pwa-register.js?v=194",
  "/pwa-register.js?v=197",
  "/pwa-register.js?v=219",
  "/pwa-register.js?v=221",
  "/pwa-register.js?v=225",
  "/app.js?v=225",
  "/assets/trivago-hotels.json?v=196",
  "/assets/app-icon-192.png",
  "/assets/app-icon-512.png",
  "/assets/apple-touch-icon.png",
  "/assets/maskable-icon-512.png",
  "/assets/splash/apple-splash-828x1792.png",
  "/assets/splash/apple-splash-1125x2436.png",
  "/assets/splash/apple-splash-1170x2532.png",
  "/assets/splash/apple-splash-1242x2208.png",
  "/assets/splash/apple-splash-1284x2778.png",
  "/assets/splash/apple-splash-1668x2388.png",
  "/assets/splash/apple-splash-2048x2732.png",
  "/assets/front-hero-flight-map.png",
  "/assets/billig-reiser-logo-full-v116.png",
  "/assets/partner-cards/sommerhus-bat-danmark-v200.png",
  "/assets/partner-cards/campanyon-card-v200.png",
  "/assets/partner-cards/tui-card-v200.png",
  "/assets/partner-cards/nazar-card-v200.png",
  "/assets/partner-cards/citybox-card-v200.png",
  "/assets/reisevelger/attraksjonspass.jpg",
  "/assets/reisevelger/attraksjonspass-clean.jpg",
  "/assets/reisevelger/bagasjeoppbevaring.jpg",
  "/assets/reisevelger/bagasjeoppbevaring-clean.jpg",
  "/assets/reisevelger/city-pass.jpg",
  "/assets/reisevelger/city-pass-clean.jpg",
  "/assets/reisevelger/esim.jpg",
  "/assets/reisevelger/esim-clean.jpg",
  "/assets/reisevelger/feriebolig-spania.jpg",
  "/assets/reisevelger/feriebolig-spania-clean.jpg",
  "/assets/reisevelger/forsinket-fly.jpg",
  "/assets/reisevelger/forsinket-fly-clean.jpg",
  "/assets/reisevelger/opplevelser.jpg",
  "/assets/reisevelger/opplevelser-clean.jpg",
  "/assets/reisevelger/privat-sjafor.jpg",
  "/assets/reisevelger/privat-sjafor-clean.jpg",
  "/assets/reisevelger/restplass-solreise.jpg",
  "/assets/hellas/kreta/rethymno-harbour.webp",
  "/assets/hellas/kreta/elounda-bay.webp",
  "/assets/hellas/kreta/agios-nikolaos-harbour.webp",
  "/assets/hellas/kreta/peskesi-restaurant.webp",
  "/assets/hellas/kreta/tamam-restaurant-chania.webp",
  "/assets/hellas/kreta/avli-rustic-fine-dining.webp",
  "/assets/hellas/kreta/balos-beach.webp",
  "/assets/hellas/kreta/elafonissi-beach.webp",
  "/assets/hellas/kreta/falassarna-beach.webp",
  "/assets/hellas/kreta/preveli-beach.webp",
  "/assets/video/front-hero-v116.mp4",
  "/spania/",
  "/spania/spania-city.css?v=197"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((key) => (key !== CACHE_VERSION ? caches.delete(key) : null))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);

  if (url.origin === self.location.origin && url.pathname.startsWith("/api/")) {
    event.respondWith(fetch(request));
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
        return response;
      }).catch(() => caches.match(request).then((cached) => cached || caches.match("/offline.html")))
    );
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request).then((response) => {
        if (response && response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy));
        }
        return response;
      }))
    );
  }
});

self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (error) {
    data = { title: "Billig Reiser", body: event.data ? event.data.text() : "Nytt reisevarsel er klart." };
  }

  const title = data.title || "Billig Reiser";
  const options = {
    body: data.body || "Nytt reisevarsel er klart.",
    icon: data.icon || "/assets/app-icon-192.png",
    badge: data.badge || "/favicon-96x96.png",
    image: data.image,
    tag: data.tag || "billig-reiser-alert",
    renotify: Boolean(data.renotify),
    data: {
      url: data.url || "/#reisevarsel"
    },
    actions: [
      { action: "open", title: "Apne" },
      { action: "search", title: "Sok reise" }
    ]
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = new URL(event.action === "search" ? "/#travelSearch" : (event.notification.data?.url || "/"), self.location.origin).toString();

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.startsWith(self.location.origin) && "focus" in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      if (self.clients.openWindow) return self.clients.openWindow(targetUrl);
      return null;
    })
  );
});
