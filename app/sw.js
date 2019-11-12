self.addEventListener("install", event => {
    event.waitUntil(
      caches.open("static-v1").then(cache => {
        cache.addAll([
          "js/main.js",
          "js/manifest.json",
          "css/main.css",
          "img/favicon.png",
          "img/icon-192.png",
          "img/icon-512.png",
          "index.html"
        ]);
      })
    );
  });
  
  self.addEventListener("fetch", event => {
    const url = new URL(event.request.url);
  
    if (url.origin == location.origin && url.pathname == '/study-timer/') {
      event.respondWith(caches.match('/study-timer/index.html'));
      return;
    }
  
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });