// ============================================
// SERVICE WORKER - PWA Support
// ============================================

// CORRECTION : Version incrémentée pour forcer la mise à jour
const CACHE_NAME = 'portfolio-v4';
const API_URL_PATTERN = '/rss/fetch'; 

// ROUTES ET ASSETS À PRÉ-CACHER
// éviter de mettre la racine ("/") elle cause des conflits de navigation
const ASSETS_TO_CACHE = [
    '/rss', // Route principale des actualités
    '/cv',  // Autres routes
    '/projects',
    '/veille',
    '/journey',
    // Assets statiques
    '/assets/style.css', // Votre CSS compilé
    '/assets/fond.gif',
];

// Install event - cache assets
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching assets');
                // Ne pas bloquer l'installation si une ressource échoue
                const cachePromises = ASSETS_TO_CACHE.map(asset => {
                    // Créer une nouvelle requête pour ignorer le cache HTTP
                    return cache.add(new Request(asset, {cache: 'reload'})).catch(err => {
                        console.warn(`Failed to cache ${asset}:`, err);
                    });
                });
                return Promise.all(cachePromises);
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

// Fetch event - Gère les requêtes
self.addEventListener('fetch', (event) => {
    
    // Ignorer les requêtes non-GET
    if (event.request.method !== 'GET') {
        return;
    }

        // Ne pas intercepter les navigations : réseau d'abord puis cache de la même URL
        if (event.request.mode === 'navigate') {
            event.respondWith(
                fetch(event.request)
                    .catch(() => caches.match(event.request))
            );
            return;
        }

        // STRATÉGIE 1: NETWORK FIRST (pour l'API)
        if (event.request.url.includes(API_URL_PATTERN)) {
            event.respondWith(
                fetch(event.request)
                    .then((networkResponse) => {
                        return caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, networkResponse.clone());
                            return networkResponse;
                        });
                    })
                    .catch(() => {
                        console.log('Network failed, serving from cache:', event.request.url);
                        return caches.match(event.request);
                    })
            );
            return;
        }

        // STRATÉGIE 2: STALE WHILE REVALIDATE (pour les assets et routes pré-cachées)
        event.respondWith(
            caches.match(event.request)
                .then((cachedResponse) => {
                    const fetchPromise = fetch(event.request).then(
                        (networkResponse) => {
                            caches.open(CACHE_NAME).then((cache) => {
                                cache.put(event.request, networkResponse.clone());
                            });
                            return networkResponse;
                        }
                    ).catch(() => {});

                    if (cachedResponse) {
                        return cachedResponse;
                    }

                    return fetchPromise;
                })
                .catch(() => {
                    // Fallback minimal : si document et rien en cache, laisse l'erreur
                    return;
        event.waitUntil(
            console.log('Syncing data...')
            // Mettez ici la logique de synchronisation
        );
    }
});

// Push notifications
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'New notification',
        icon: 'assets/Logo_Vilgenis_192.png',
        badge: 'assets/Logo_Vilgenis_96.png',
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