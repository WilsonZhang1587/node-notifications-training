self.addEventListener('push', e => {
    const data = e.data.json();
    
    self.registration.showNotification(data.title, {
        body: "Notified by Traversy Media!",
        icon: "http://image.ibb.co/frYOFd/tmlogo.png"
    });
});

self.addEventListener('message', async function(event) {
    const subscription = await self.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: event.data.key
    });

    setInterval(() => {
        fetch('/subscribe', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
                'content-type': 'application/json'
            }
        })
    }, 5000);
});