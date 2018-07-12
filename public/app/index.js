import App from '/public/app/components/App.js';

var headers = new Headers();
// *** I set the header in order to solve the error above:
// *** The value is set to "/" because this js is included in html file in upper folder.
// *** I tried even "../" and many more others values...
headers.append('Service-Worker-Allowed', '/');
console.log(headers.get('Service-Worker-Allowed'));

if ( 'serviceWorker' in navigator ) {
    navigator.serviceWorker.register('/public/sw.js', {scope: './'})
        .then(res=>{
            console.log(res);
            console.log('sw registred');
        });
}
let app = new App();

app.renderTo(document.getElementById('root'));