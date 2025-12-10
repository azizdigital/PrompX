/**
 * PromptForge OIM - Service Worker
 * Handles offline functionality and caching for PWA
 */

const CACHE_NAME = 'promptforge-oim-v1.0.0';
const DYNAMIC_CACHE = 'promptforge-oim-dynamic-v1';

// Files to cache immediately on install
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/css/style.css',
    '/js/app.js',
    '/js/ui.js',
    '/js/prompts.js',
    '/js/storage.js',
    '/js/clipboard.js',
    '/js/utils.js',
    '/icons/icon-192.png',
    '/icons/icon-512.png',
    '/icons/favicon.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('[Service Worker] Installed successfully');
                return self.skipWaiting(); // Activate immediately
            })
            .catch((error) => {
                console.error('[Service Worker] Installation failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((name) => {
                            // Delete old caches
                            return name !== CACHE_NAME && name !== DYNAMIC_CACHE;
                        })
                        .map((name) => {
                            console.log('[Service Worker] Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            })
            .then(() => {
                console.log('[Service Worker] Activated successfully');
                return self.clients.claim(); // Take control immediately
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension and other non-http(s) requests
    if (!request.url.startsWith('http')) {
        return;
    }
    
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    console.log('[Service Worker] Serving from cache:', request.url);
                    return cachedResponse;
                }
                
                // Not in cache, fetch from network
                console.log('[Service Worker] Fetching from network:', request.url);
                
                return fetch(request)
                    .then((response) => {
                        // Don't cache if not successful
                        if (!response || response.status !== 200 || response.type === 'error') {
                            return response;
                        }
                        
                        // Clone the response
                        const responseToCache = response.clone();
                        
                        // Add to dynamic cache for offline use
                        caches.open(DYNAMIC_CACHE)
                            .then((cache) => {
                                cache.put(request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch((error) => {
                        console.error('[Service Worker] Fetch failed:', error);
                        
                        // Return offline page or fallback
                        return caches.match('/index.html')
                            .then((fallbackResponse) => {
                                return fallbackResponse || new Response(
                                    'Offline - Please check your connection',
                                    {
                                        status: 503,
                                        statusText: 'Service Unavailable',
                                        headers: new Headers({
                                            'Content-Type': 'text/plain'
                                        })
                                    }
                                );
                            });
                    });
            })
    );
});

// Listen for messages from the app
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAR_CACHE') {
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => caches.delete(cacheName))
            );
        }).then(() => {
            console.log('[Service Worker] All caches cleared');
            event.ports[0].postMessage({ type: 'CACHE_CLEARED' });
        });
    }
});

// Background sync (if needed in future)
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-data') {
        console.log('[Service Worker] Background sync triggered');
        // Could sync data with server here if needed
    }
});

// Push notifications (if needed in future)
self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        console.log('[Service Worker] Push received:', data);
        
        const options = {
            body: data.body || 'New notification',
            icon: '/icons/icon-192.png',
            badge: '/icons/icon-192.png',
            vibrate: [200, 100, 200],
            data: {
                url: data.url || '/'
            }
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title || 'PromptForge OIM', options)
        );
    }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    const urlToOpen = event.notification.data.url || '/';
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((clientList) => {
                // Check if app is already open
                for (const client of clientList) {
                    if (client.url === urlToOpen && 'focus' in client) {
                        return client.focus();
                    }
                }
                
                // Open new window if app not already open
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
    );
});

console.log('[Service Worker] Loaded and ready');