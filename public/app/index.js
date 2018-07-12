import App from '/public/app/components/App.js';


if ( 'serviceWorker' in navigator ) {
    navigator.serviceWorker.register('/public/sw.js',)
        .then(res=>{
            console.log(res);
            console.log('sw registred');
        });
}
let app = new App();

app.renderTo(document.getElementById('root'));