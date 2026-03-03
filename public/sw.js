// Lab Buddy Service Worker
const CACHE_NAME = "labbuddy-v1";

// Static shell to pre-cache on install
const PRECACHE_URLS = [
  "/",
  "/app",
  "/results",
  "/encyclopedia",
  "/manifest.json",
  "/icon.svg",
];

// ── Install: pre-cache the app shell ─────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // addAll fails silently if any URL is unreachable (e.g. API routes)
      return Promise.allSettled(
        PRECACHE_URLS.map((url) =>
          cache.add(url).catch(() => {
            // Ignore failed pre-cache (SSR pages may not be available)
          })
        )
      );
    })
  );
  // Activate immediately without waiting for old clients to unload
  self.skipWaiting();
});

// ── Activate: clean up old caches ────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
  // Take control of all clients immediately
  self.clients.claim();
});

// ── Fetch: routing strategy ───────────────────────
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests from our own origin
  if (request.method !== "GET" || url.origin !== location.origin) return;

  // Skip API routes and Next.js internals — always network
  if (
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/_next/webpack-hmr") ||
    url.pathname.startsWith("/__nextjs")
  ) {
    return;
  }

  // Cache-first for Next.js static assets (hashed, immutable)
  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            if (response.ok) {
              const clone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            }
            return response;
          })
      )
    );
    return;
  }

  // Stale-while-revalidate for encyclopedia pages (statically generated)
  if (url.pathname.startsWith("/encyclopedia")) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) =>
        cache.match(request).then((cached) => {
          const networkFetch = fetch(request).then((response) => {
            if (response.ok) cache.put(request, response.clone());
            return response;
          });
          return cached || networkFetch;
        })
      )
    );
    return;
  }

  // Network-first with cache fallback for all other navigation requests
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(request))
  );
});
