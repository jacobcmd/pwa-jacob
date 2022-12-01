self.addEventListener("install", (e) => {
  caches.open("cache-v1").then((cache) => {
    cache.addAll([
      "index.html",
      "main.js",
      "images/poeta1.jpg",
      "images/poeta2.jpg",
      "images/poeta3.jpg",
      "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css",
      "videos/7-hispanos.mp4",
      "videos/10-poemas.mp4",
      "videos/Antonio-MACHADO.mp4",
    ]);
  });
  e.waitUntil(cacheProm);
});


//Evento fetch
self.addEventListener("fetch", event => {
	event.respondWith(
		caches.open('cache-v1').then(cache => {
			return cache.match(event.request).then(response => {
				return response || fetch(event.request).then(networkResponse => {
					cache.put(event.request, networkResponse.clone());
					return networkResponse;
				});
			})
		})
	);
});