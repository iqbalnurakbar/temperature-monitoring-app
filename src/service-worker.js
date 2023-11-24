// public/sw.js
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('my-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/static/js/bundle.js',
          '/static/js/0.chunk.js',
          '/static/js/main.chunk.js',
          '/favicon.ico',
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  
  // Tambahkan izin notifikasi
  self.addEventListener('push', (event) => {
    const options = {
      body: event.data.text(),
      icon: 'path/to/your/icon.png', // Ganti dengan path icon sesuai kebutuhan
    };
  
    event.waitUntil(
      self.registration.showNotification('Judul Notifikasi', options)
    );
  });
  