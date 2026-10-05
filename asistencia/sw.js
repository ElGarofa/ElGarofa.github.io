// Service worker: cachea solo archivos estáticos. Los fichajes y el panel
// SIEMPRE van al servidor (necesitan la base de datos), nunca se guardan en caché.
const VERSION = 'asistencia-v1';
const ESTATICOS = [
  'offline.html',
  'assets/style.css',
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(VERSION).then((c) => c.addAll(ESTATICOS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return; // los POST (fichar, editar) pasan directo

  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // Páginas: red primero; si no hay conexión, pantalla "sin conexión"
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).catch(() => caches.match('offline.html'))
    );
    return;
  }

  // Estáticos (css, íconos): caché primero, actualiza en segundo plano
  if (url.pathname.includes('/assets/')) {
    e.respondWith(
      caches.match(req).then((hit) => {
        const red = fetch(req).then((res) => {
          const copia = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copia));
          return res;
        }).catch(() => hit);
        return hit || red;
      })
    );
  }
});
