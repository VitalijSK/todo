self.addEventListener('install', function(event) {
     console.log('sw installed');
     event.waitUntil(
        caches.open('public')
        .then(function(cache){
            return cache.addAll([
                '/public/',
                '/public/index.html',
                '/public/css/style.css',
                '/public/app/index.js',
                '/public/app/events.js',
                '/public/app/statuses.js',
                '/public/app/components/App.js',
                '/public/app/components/Info.js',
                '/public/app/components/Manager.js',
                '/public/app/components/Notes.js',
                '/public/app/framework/ApiStorage.js',
                '/public/app/framework/LocalStorage.js',
                '/public/app/framework/MainStorage.js',
                '/public/app/framework/autoBind.js',
                '/public/app/model/itemModel.js',
                '/public/app/model/listModel.js'
 
            ]);
        })
     );
 });
 self.addEventListener('activate', ()=>{
     console.log('sw activate');
 });
 
 self.addEventListener('fetch', (event)=>{
    event.respondWith(
        caches.match(event.request)
            .then( res =>{
                if (res) {
                    return res
                } else {
                    return fetch(event.request);
                }
            })
    );
 });
 