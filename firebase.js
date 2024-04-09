// server.js
const express = require('express');
const admin = require('firebase-admin');
const path = require('path');
// import  express from 'express';
// import admin from'firebase-admin';
// import path from 'path';

// Initialize the Firebase admin SDK
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: 'second-strand-385600',
    privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDEAEYZb7RdQZb+\nThm6XCg0eyXKVwBJu+pMbR4n+fgdWxioY8iF1IXq2PQMYJbQVKO7HU4So3zZ9cZ3\ns46q0niaat7/l/8fn/nZ/wXM5W1i8XgZN/cPlUX//8s0xSv+Wfn5NbEypURaCV9E\nFTlDUYNa5ag46uc8aGFPQVsLwb9Iwvi6t434dj4vQG2hs8+dEmzMUJqADcFM0Y8x\nj8aSJldDmwqENmP1QTnwRLzh2z81M9rvawk3MMSEu7kAH8BB1u6ScFdloVgza4X1\nUq/E9rD+o9gRaEzoNIA5m1lFqW/2i2DrORSjWXTukdwHaNmLNatAXS7/zyE+ANZM\n2c0z7TwlAgMBAAECggEAB0IXASD4GKj8ZAlKiMfEtwwlaNy3wRiWngMUxg21cLQw\n0abfpDHBI3fVHR05kILwjOtnpVHiZnmPF9vcHrrMZl7VSGPy+b3qmnZIGx+W4VOz\nAG9oXy5xCRXKSwy51Zbe5n86GIzytEkwZYd0rKfDhGrzQ7z9Lak+4Ji5Zqd42Nig\n7BOsVMCuYge1GFb8WBdZanrQtV3SbWGe2n+YPpVnnd5H0rK7Yp6UQcLZ3LgAREAY\nqQq/rsVMpuZ8mS/1xHnJ//lwd0j4bHIZGwScR718+cqf0tSkShUeERFUyoJjxNkp\n5qMcZLE7DPWptVvEX9dqGSIh2C7yKSDQgNU/lUHNKQKBgQDgOXA3pFwWdUj+joU0\nOMLodyOt3wkIfNJ5sZ4rFzMnIDXMZGiCDLWgSyEg8X+S4nST8mEGOown1nQ0Ijee\nbllLVESWv6U0lMGg9yP+jlemr7iaY0H58x4liGK1el4751aL2Xj5/3HpjXpImBj2\nd2iUMozvfVWGDjzy8BQRFiFeTQKBgQDfxu6HmyKkH0GnoHOHqsVXZasHGpFKtcdY\npSiZqNHRBlY3qmUnn1NqtEF98GPeA8Eft2KzH/tfJ2mm4m+38eY1rdltyO7ewbDT\nHCbxYXjXWQankHEv7ARKwyWLavfXiK/KiH9TOgMe0Qga1qCH9FPnjg6pXUdr1Y2M\n2ao0I3yxOQKBgFiO1v9i7uv/zqCbcYi6kmB2DaVyXYL4qbheqnWiaBWf5x+e2Jfk\npSd2BNOaDiTZQ+na5O8s2IYzcRnWGdl9A894rM5NStaFmiQU+CZl2cB/zo1LfpdV\nqiZww2uhtO475Da/4cP7W+Y+dnmNeO5/ItLFVFySR+D2ZqQcphBJiUxRAoGAM/1J\nyaOXRr4kSMeUT76zHnz2YS4g91SIPeYRKrH4HTH1sfUajzwK6015scK50QjaQ34d\npjQV+KN1flo5Tmka7Pm4/DKknIgvhryRp57XrmB2lVOPmGyjCqOQA3YUorSU8t8H\nhdSCiRRTZ7jZjvyKyc9NRLfxMfJpcoHXc0mTXLECgYEAiS8LOWAKmyqKWxYKBC4I\nay/gLa+hHvQJZa6SdElDwfpVkz7EV8wGf9quryaMbFx5bbtF5kjm5FlaOrDUeJw5\nO10HwaCv21F03H5zl9gSWGiCUT6WUitKrNSXWsY0F4hS1io+Wo0f+y3n2q7n8zey\nfu8yHCWlmV8Kurv6EzmUWPA=\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-pdri5@second-strand-385600.iam.gserviceaccount.com",
  }),
  databaseURL: 'https://your-firebase-project.firebaseio.com'
});




const app = express();
app.use(express.json());

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

// Handle the device registration
app.post('/register-device', (req, res) => {
  const registrationToken = req.body.registrationToken;

  // Store the registration token or use it to send notifications
  console.log('Received registration token:', registrationToken);

  res.send('Device registered successfully.');
});

app.get('/firebase-messaging-sw.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'node_modules', 'firebase', 'firebase-messaging-sw.js'));
  });

// Handle the push notification request
app.post('/send-notification', (req, res) => {
  // The registration token obtained from the client (web application)
  const registrationToken = 'YOUR_DEVICE_REGISTRATION_TOKEN';

  // The notification payload
  const payload = {
    notification: {
      title: 'Hello, iPhone!',
      body: 'This is a web push notification.'
    }
  };

  // Send the notification
  admin.messaging().sendToDevice(registrationToken, payload)
    .then((response) => {
      console.log('Notification sent successfully!');
      res.send('Notification sent successfully!');
    })
    .catch((error) => {
      console.error('Error sending notification:', error);
      res.status(500).send('Error sending notification');
    });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});