const SW_VERSION = new URL(self.location.href).searchParams.get("v") || "dev";
const CACHE_PREFIX = "zeroant-static-";
const CACHE_NAME = `${CACHE_PREFIX}${SW_VERSION}`;
const STATIC_DESTINATIONS = new Set(["script", "style", "image", "font"]);
const STATIC_ASSET_PATH_SEGMENTS = ["/assets/", "/js/", "/images/", "/fonts/", "/responsive/"];
const PRECACHE_ASSETS = ["/favicon.ico", "/site.webmanifest", "/logo.webp"];

function isSameOriginRequest(requestUrl) {
  return requestUrl.origin === self.location.origin;
}

function isNavigationRequest(request) {
  return request.mode === "navigate" || request.destination === "document";
}

function isStaticAssetRequest(request, requestUrl) {
  if (!isSameOriginRequest(requestUrl) || isNavigationRequest(request)) {
    return false;
  }

  if (STATIC_DESTINATIONS.has(request.destination)) {
    return true;
  }

  return STATIC_ASSET_PATH_SEGMENTS.some((segment) => requestUrl.pathname.includes(segment));
}

async function cacheStaticAsset(request, response) {
  if (!response || response.status !== 200) {
    return response;
  }

  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response.clone());
  return response;
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          const isLegacyCache = cacheName.startsWith("zeroant-cache");
          const isStaleStaticCache =
            cacheName.startsWith(CACHE_PREFIX) && cacheName !== CACHE_NAME;

          if (isLegacyCache || isStaleStaticCache) {
            return caches.delete(cacheName);
          }

          return Promise.resolve(false);
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);

  if (!isStaticAssetRequest(event.request, requestUrl)) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        void fetch(event.request)
          .then((networkResponse) => cacheStaticAsset(event.request, networkResponse))
          .catch(() => {});
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => cacheStaticAsset(event.request, networkResponse))
        .catch(() => caches.match(event.request));
    })
  );
});
