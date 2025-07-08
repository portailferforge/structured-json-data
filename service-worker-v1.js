const CACHE_NAME = "transferts-v1";
const urlsToCache = [
  "/?utm_source=pwa-fr",
  "https://cdn.jsdelivr.net/gh/portailferforge/portail.html/images/favico/favicon-32x32.png",
  "https://cdn.jsdelivr.net/gh/portailferforge/portail.html/images/favico/android-icon-192x192.png",
  "https://cdn.jsdelivr.net/gh/portailferforge/portail.html/images/favico/apple-icon-180x180.png"
];

// Installation du service worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activation
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
});

// Interception des requêtes
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response =>
      response || fetch(event.request)
    )
  );
});
