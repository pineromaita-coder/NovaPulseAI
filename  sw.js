// MAITA NOVA IA V1 - Service Worker

const CACHE = "maita-v1";

const archivos = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./market.js",
  "./voice.js",
  "./manifest.json"
];

// Instalar
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(archivos))
  );
  self.skipWaiting();
});

// Activar
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => key !== CACHE ? caches.delete(key) : null)
      )
    )
  );
  self.clients.claim();
});

// Cache primero, red después
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(respuesta => {
      return respuesta || fetch(event.request);
    })
  );
});