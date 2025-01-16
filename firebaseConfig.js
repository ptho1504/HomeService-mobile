// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAme7RIkKmvzr0kK9izQDgf6fxhfBlyZKQ',
  authDomain: 'home-service-2bed1.firebaseapp.com',
  projectId: 'home-service-2bed1',
  storageBucket: 'home-service-2bed1.firebasestorage.app',
  messagingSenderId: '6537819165',
  appId: '1:6537819165:web:fbf4b7f9d88be6e608c2f4',
  measurementId: 'G-XWL2VX96B3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
