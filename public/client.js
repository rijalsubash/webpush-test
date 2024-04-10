const subscribeBtn = document.getElementById('subscribe-btn');
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

function subscribeToNotifications() {
  const subscribeOptions = {
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array('BPf1QoUlX4Cjqc15wn4j7xUAfKVMZLKqp6cQYRnAwvky2wywBCZx0HAXnnB7pqoMtgkWygPgs5d8h5vpDfRMos8'),
  };

  serviceWorkerRegistration.pushManager.subscribe(subscribeOptions)
    .then(subscription => {
      fetch('/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscription)
      })
      .then(res => {
        if (res.ok) {
          console.log('Subscription successful');
        } else {
          console.error('Subscription failed');
        }
      })
      .catch(error => {
        console.error('Error sending subscription:', error);
      });
    })
    .catch(error => {
      if (error.message.includes('A subscription with a different applicationServerKey')) {
        unsubscribeFromPushNotifications();
        subscribeToNotifications();
      } else {
        console.error('Error subscribing to push notifications:', error);
      }
    });
}

function requestNotificationPermission() {
  if (!('Notification' in window)) {
      console.error('This browser does not support desktop notification');
      return;
  }

  Notification.requestPermission().then(permission => {
      // if (permission === 'granted') {
      //   subscribeToNotifications();
      // } else {
      //     console.warn('User denied permission for notifications');
      // }
      if (permission === 'granted') {
        subscribeToNotifications();
    } else if (permission === 'denied') {
        console.warn('User denied permission for notifications');
        // Display a message to the user informing them about the denied permission
        // Provide guidance on how they can manage notification settings
    } else if (permission === 'default') {
     
        console.warn('User closed the permission dialog without making a choice');
        // Optionally, you can handle this scenario based on your application's logic
    }
  });
}

window.addEventListener('load', ()=> {
  requestNotificationPermission()
})

function unsubscribeFromPushNotifications() {
  serviceWorkerRegistration.pushManager.getSubscription()
    .then(subscription => {
      if (subscription) {
        return subscription.unsubscribe();
      }
    })
    .catch(error => {
      console.error('Error unsubscribing from push notifications:', error);
    });
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(registration => {
      serviceWorkerRegistration = registration;
    })
    .catch(error => console.error('Error registering service worker:', error));
}

subscribeBtn.addEventListener('click', subscribeToNotifications);