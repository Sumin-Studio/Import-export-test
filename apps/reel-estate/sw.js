/* reel-estate — minimal offline shell for PWA */
const CACHE_NAME = "reel-estate-v1";

function scopeUrls(scope) {
  return [scope + "index.html", scope + "manifest.webmanifest", scope + "icon.svg"];
}

self.addEventListener("install", function (event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      var urls = scopeUrls(self.registration.scope);
      return Promise.all(
        urls.map(function (url) {
          return cache.add(url).catch(function () {
            /* ignore individual precache failures (e.g. MIME quirks) */
          });
        })
      );
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches
      .keys()
      .then(function (keys) {
        return Promise.all(
          keys
            .filter(function (k) {
              return k !== CACHE_NAME;
            })
            .map(function (k) {
              return caches.delete(k);
            })
        );
      })
      .then(function () {
        return self.clients.claim();
      })
  );
});

self.addEventListener("fetch", function (event) {
  if (event.request.method !== "GET") return;
  var url;
  try {
    url = new URL(event.request.url);
  } catch {
    return;
  }
  if (url.origin !== self.location.origin) return;

  var indexUrl = self.registration.scope + "index.html";

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(function () {
        return caches.match(indexUrl);
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      if (cached) return cached;
      return fetch(event.request).then(function (res) {
        if (!res || res.status !== 200 || res.type !== "basic") return res;
        var copy = res.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(event.request, copy);
        });
        return res;
      });
    })
  );
});
