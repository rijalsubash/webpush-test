// Import the Firebase SDK
import firebase from 'firebase/app';
import 'firebase/messaging';

// Initialize the Firebase app with your project configuration
const firebaseConfig = {
    apiKey: "AIzaSyD56J98XZ-sZDq31xg4do67EWVSMxwdvsg",
    authDomain: "second-strand-385600.firebaseapp.com",
    projectId: "second-strand-385600",
    storageBucket: "second-strand-385600.appspot.com",
    messagingSenderId: "427433329452",
    appId: "1:427433329452:web:b6b58ad3c07a3151d66289",
    measurementId: "G-XF4C4XKYHJ"
  };

firebase.initializeApp(firebaseConfig);

// Get the Firebase Messaging instance
const messaging = firebase.messaging();

export { messaging };