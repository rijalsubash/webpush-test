self.addEventListener('push', event => {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
      body: data.description,
      
      icon: '/syacho.jpg'
    });
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered successfully:', registration);
        // ...
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  }