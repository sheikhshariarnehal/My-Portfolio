// Service Worker for Sheikh Shariar Nehal Portfolio
// Version 1.0.0 - Implements caching strategies for optimal performance

const CACHE_NAME = 'portfolio-cache-v1';
const STATIC_CACHE = 'static-cache-v1';
const DYNAMIC_CACHE = 'dynamic-cache-v1';

// Critical resources to cache immediately (App Shell)
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/assets/css/style.css',
    '/assets/js/script.js',
    '/assets/js/particles.min.js',
    '/assets/js/app.js',
    '/assets/images/hero.webp',
    '/assets/images/profile2.webp',
    '/assets/images/Favicon.webp',
    '/skills.json'
];

// External resources to cache
const EXTERNAL_ASSETS = [
    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.5/typed.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.7.0/vanilla-tilt.min.js',
    'https://unpkg.com/scrollreveal@4.0.9/dist/scrollreveal.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Installing...');

    event.waitUntil(
        Promise.all([
            // Cache local static assets
            caches.open(STATIC_CACHE).then((cache) => {
                console.log('[ServiceWorker] Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            }),
            // Cache external assets
            caches.open(DYNAMIC_CACHE).then((cache) => {
                console.log('[ServiceWorker] Caching external assets');
                return Promise.all(
                    EXTERNAL_ASSETS.map((url) =>
                        fetch(url, { mode: 'cors' })
                            .then((response) => {
                                if (response.ok) {
                                    return cache.put(url, response);
                                }
                            })
                            .catch((err) => console.log('[ServiceWorker] Failed to cache:', url))
                    )
                );
            })
        ]).then(() => {
            console.log('[ServiceWorker] Installation complete');
            return self.skipWaiting();
        })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activating...');

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((name) => {
                        return name !== STATIC_CACHE && name !== DYNAMIC_CACHE;
                    })
                    .map((name) => {
                        console.log('[ServiceWorker] Deleting old cache:', name);
                        return caches.delete(name);
                    })
            );
        }).then(() => {
            console.log('[ServiceWorker] Activation complete');
            return self.clients.claim();
        })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip Chrome extension and dev tools requests
    if (url.protocol === 'chrome-extension:' || url.hostname === 'localhost' && url.port !== '8080') {
        return;
    }

    // Strategy: Cache First for static assets
    if (isStaticAsset(request)) {
        event.respondWith(cacheFirst(request));
        return;
    }

    // Strategy: Stale While Revalidate for fonts
    if (isFontRequest(request)) {
        event.respondWith(staleWhileRevalidate(request));
        return;
    }

    // Strategy: Network First for HTML (to get fresh content)
    if (request.headers.get('accept')?.includes('text/html')) {
        event.respondWith(networkFirst(request));
        return;
    }

    // Strategy: Stale While Revalidate for everything else
    event.respondWith(staleWhileRevalidate(request));
});

// Helper: Check if request is for static asset
function isStaticAsset(request) {
    const url = new URL(request.url);
    return (
        url.pathname.endsWith('.css') ||
        url.pathname.endsWith('.js') ||
        url.pathname.endsWith('.webp') ||
        url.pathname.endsWith('.png') ||
        url.pathname.endsWith('.jpg') ||
        url.pathname.endsWith('.jpeg') ||
        url.pathname.endsWith('.svg') ||
        url.pathname.endsWith('.woff2') ||
        url.pathname.endsWith('.woff')
    );
}

// Helper: Check if request is for font
function isFontRequest(request) {
    const url = new URL(request.url);
    return (
        url.hostname.includes('fonts.googleapis.com') ||
        url.hostname.includes('fonts.gstatic.com') ||
        url.pathname.endsWith('.woff2') ||
        url.pathname.endsWith('.woff')
    );
}

// Cache First Strategy - best for static assets
async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }

    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.log('[ServiceWorker] Fetch failed:', error);
        // Return offline fallback if available
        return caches.match('/');
    }
}

// Network First Strategy - best for HTML
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.log('[ServiceWorker] Network failed, serving from cache');
        const cachedResponse = await caches.match(request);
        return cachedResponse || caches.match('/');
    }
}

// Stale While Revalidate Strategy - best for fonts & API calls
async function staleWhileRevalidate(request) {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await caches.match(request);

    // Fetch in background
    const fetchPromise = fetch(request)
        .then((networkResponse) => {
            if (networkResponse.ok) {
                cache.put(request, networkResponse.clone());
            }
            return networkResponse;
        })
        .catch((error) => {
            console.log('[ServiceWorker] Background fetch failed:', error);
        });

    // Return cached response immediately, or wait for network
    return cachedResponse || fetchPromise;
}

console.log('[ServiceWorker] Script loaded');
