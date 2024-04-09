const express = require('express');
const webpush = require('web-push');
const path = require('path');

const app = express();
const port = process.env.PORT || 5001;

const vapidKeys = {
  publicKey: 'BPf1QoUlX4Cjqc15wn4j7xUAfKVMZLKqp6cQYRnAwvky2wywBCZx0HAXnnB7pqoMtgkWygPgs5d8h5vpDfRMos8',
  privateKey: 'xYuIzOtoYu79CSNrJEjTAedPcoJ0atR4_MPpgZN_cOU'
};

webpush.setVapidDetails(
  'mailto:subash@eyemovic.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public/pwa')));


app.post('/subscribe', (req, res) => {
  const subscriptionRequest = req.body;
  console.log(subscriptionRequest)
  console.log('@body')
  webpush.sendNotification(subscriptionRequest, JSON.stringify({ title: "Hello from push notification", description: "This is a test notification" }))
  .catch(error => console.error(error));

  res.status(200).json({ success: true });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});