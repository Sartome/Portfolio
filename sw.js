// ============================================
// SERVICE WORKER - PWA Support
// ============================================

// CORRECTION : Version incrémentée pour forcer la mise à jour
const CACHE_NAME = 'portfolio-v3'; 
const API_URL_PATTERN = '/rss/fetch'; 

// CORRECTION : Inclure les routes PHP et non les .html
// Note : Le 'scope' de votre manifest est '/', donc tous les chemins sont relatifs à la racine.
const ASSETS_TO_CACHE = [
    '/',
    '/rss', // Route principale des actualités
    '/cv',  // Autres routes
    '/projects',
    '/veille',
    '/journey',
    // Assets statiques
    '/assets/style.css', // Votre CSS compilé
    '/assets/fond.gif',
    '/assets/rss.js' // Renommé pour correspondre à la page 'rss'
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

    // CORRECTION : STRATÉGIE 1: NETWORK FIRST (pour l'API)
    // Pour que les actualités soient toujours à jour.
    if (event.request.url.includes(API_URL_PATTERN)) {
        event.respondWith(
            fetch(event.request)
                .then((networkResponse) => {
                    // Si la requête réseau réussit, on met à jour le cache
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                })
                .catch(() => {
                    // Si le réseau échoue (offline), on sert l'ancienne version du cache
                    console.log('Network failed, serving from cache:', event.request.url);
                    return caches.match(event.request);
                })
        );
        return;
    }

    // STRATÉGIE 2: STALE WHILE REVALIDATE (pour les pages et assets)
    // C'est un bon équilibre : rapide (cache) mais se met à jour en arrière-plan.
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                // Aller chercher la version fraîche sur le réseau
                const fetchPromise = fetch(event.request).then(
                    (networkResponse) => {
                        // Mettre à jour le cache avec la nouvelle version
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, networkResponse.clone());
                        });
                        return networkResponse;
                    }
                ).catch(() => {
                    // Le réseau a échoué, on ne fait rien
                    // (si on avait une réponse en cache, elle est déjà renvoyée)
                });

                // Renvoyer la version du cache immédiatement si elle existe
                if (cachedResponse) {
                    return cachedResponse;
                }

                // Si pas de cache, attendre la réponse du réseau
                return fetchPromise;
            })
            .catch(() => {
                // Fallback (si la page n'est pas en cache et le réseau est mort)
                if (event.request.destination === 'document') {
                    return caches.match('/'); // Renvoie la page d'accueil
                }
            })
    );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    console.log('Service Worker: Background sync', event.tag);
    if (event.tag === 'sync-data') {
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