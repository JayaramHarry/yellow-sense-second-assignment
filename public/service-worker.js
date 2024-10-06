// Name of the cache
const CACHE_NAME = 'job-app-cache';
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',
  '/app-logo.png', // Add any other static assets you want to cache
];

// Install service worker and cache files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Respond with cache on fetch, else fetch from network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Serve cached response if available, else fetch from the network
      return response || fetch(event.request).then((fetchResponse) => {
        // Check if we received a valid response
        if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
          return fetchResponse; // If not valid, return the fetch response
        }

        // Clone the response because it's a stream and can only be consumed once
        const responseToCache = fetchResponse.clone();

        // Cache the new response for future requests
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return fetchResponse;
      });
    }).catch(() => {
      // If both cache and network fail, return offline page or a fallback response
      return caches.match('/offline.html');
    })
  );
});

// Activate the service worker and clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Delete old caches
          }
        })
      );
    })
  );
});
