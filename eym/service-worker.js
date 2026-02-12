const CACHE_NAME = "em-pwa-v3";

const urlsToCache = [
  "./",
  "./index.html",
  "./tienda.html",
  "./manifest.json",
  "./css/custom.css",
  "./js/productos.js",
  "./js/carrito.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
