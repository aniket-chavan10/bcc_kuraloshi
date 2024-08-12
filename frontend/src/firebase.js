// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA76WDU5ssb4vypnJdQ5L0PJPGVVIPW1kg",
  authDomain: "bccfullstack.firebaseapp.com",
  projectId: "bccfullstack",
  storageBucket: "bccfullstack.appspot.com",
  messagingSenderId: "365752571483",
  appId: "1:365752571483:web:234dcdf6f6ed7d7114d17e",
  measurementId: "G-L0SKDXZ2FZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);