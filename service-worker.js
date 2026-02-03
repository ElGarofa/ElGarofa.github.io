const CACHE_NAME = "em-pwa-v2";

const urlsToCache = [
  "./",
  "./index.html",
  "./tienda.html",
  "./css/custom.css",
  "./js/productos.js",
  "./js/carrito.js",
  "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});
