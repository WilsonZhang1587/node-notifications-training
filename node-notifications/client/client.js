const publicVapidKey = 'BEbR59GllBpkzCfAudE0rOM0sox0m6OoaQICdZCsyQzujY8ATcehV5Yo3H_Av8RwUdZE3kmBJJHgl372-sUXrHA';

// Check for service worker
if('serviceWorker' in navigator) {
    send().catch(err => console.error(err));
}

async function send() {
    // Register service worker
    console.log('Registering service worker...');
    const register = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
    });
    console.log('ServiceWorker registration successful with scope: ', register.scope);
    console.log('Service Worker Registered...');

    // Register Push
    console.log('Registering Push...');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log('Push Registered...');

    // Send Push Notification
    console.log('Sending Push...');
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    })
    console.log('Push Sent...');
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