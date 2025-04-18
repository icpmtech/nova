
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('nova-cache').then(function (cache) {
      return cache.addAll([
        '/',
        '/login.html',
        '/manifest.json',
        '/icons/icon-192.png',
        '/icons/icon-512.png',
        // outros assets que queiras cachear
      ]);
    })
  );
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    caches.match(e.request).then(function (response) {
      return response || fetch(e.request);
    })
  );
});
