self.addEventListener('install', e =>{
  const cacheProm = caches.open('cache-v1')
      .then(cache => {
          return cache.addAll([
            'index.html',
            'images/poeta1.jpg',
            'images/poeta2.jpg',
            'images/poeta3.jpg',
            'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'
      ,      'videos/7-hispanos.mp4',
            'videos/10-poemas.mp4',
            'videos/Antonio-MACHADO.mp4'
          ])
          
      });
  e.waitUntil(cacheProm);
});


self.addEventListener('fetch', e =>{
    //cache with network fallback
    const respuesta = caches.match( e.request )
        .then ( res => {
            if ( res ) return res;
            //no existe el archivo
            //tengo que ir a la web
            console.log('No existe', e.request.url);
            return fetch( e.request ).then ( newResp => {
                caches.open('cache-v1')
                    .then( cache => {
                        cache.put( e.request, newResp);
                    }

                    )
                return newResp.clone;
            });
        });
        e.respondWith(respuesta);
    //only cache
    //e.respondWith( caches.match(e.request));
});

