const publicVapidKey = 'BEbR59GllBpkzCfAudE0rOM0sox0m6OoaQICdZCsyQzujY8ATcehV5Yo3H_Av8RwUdZE3kmBJJHgl372-sUXrHA';

// Check for service worker
if('serviceWorker' in navigator) {
    send()
}

function send() {
    // navigator.serviceWorker.register('/sw.js', { scope: '/' });
    // navigator.serviceWorker.controller.postMessage({'key': urlBase64ToUint8Array(publicVapidKey)});
    
    const options = { tag : 'user_alerts' };
    navigator.serviceWorker.ready.then(function(registration) {
        registration.getNotifications(options).then(function(notifications) {
            console.log(notifications)
        })
    });
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
   
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
   
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }