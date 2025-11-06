// ============================================
// SERVICE WORKER - PWA Support
// ============================================

const CACHE_NAME = 'portfolio-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/actuality.html',
    '/assets/style.css',
    '/assets/actuality.css',
    '/assets/modern-features.css',
    '/assets/security.js',
    '/assets/actuality.js',
    '/assets/modern-features.js',
    '/assets/fond.gif'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching assets');
                return cache.addAll(ASSETS_TO_CACHE);
            })
            .then(() => self.skipWaiting())
            .catch((err) => console.error('Service Worker: Cache failed', err))
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cache) => {
                        if (cache !== CACHE_NAME) {
                            console.log('Service Worker: Clearing old cache', cache);
                            return caches.delete(cache);
                        }
                    })
                );
            })
            .then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version or fetch from network
                return response || fetch(event.request)
                    .then((fetchResponse) => {
                        // Cache new resources
                        return caches.open(CACHE_NAME)
                            .then((cache) => {
                                // Only cache GET requests
                                if (event.request.method === 'GET') {
                                    cache.put(event.request, fetchResponse.clone());
                                }
                                return fetchResponse;
                            });
                    });
            })
            .catch(() => {
                // Offline fallback
                if (event.request.destination === 'document') {
                    return caches.match('/index.html');
                }
            })
    );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    console.log('Service Worker: Background sync', event.tag);
    
    if (event.tag === 'sync-data') {
        event.waitUntil(
            // Perform sync operations
            console.log('Syncing data...')
        );
    }
});

// Push notifications
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'New notification',
        icon: '/assets/Logo_Vilgenis.png',
        badge: '/assets/Logo_Vilgenis.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    
    event.waitUntil(
        self.registration.showNotification('Portfolio Update', options)
    );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
    console.log('Notification clicked:', event.notification.tag);
    event.notification.close();
    
    event.waitUntil(
        clients.openWindow('/')
    );
});
