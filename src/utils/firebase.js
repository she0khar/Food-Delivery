// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5LxCflUxZlzN0BPGlBZYjhifs7S5XFoM",
  authDomain: "food-delivery-70eee.firebaseapp.com",
  projectId: "food-delivery-70eee",
  storageBucket: "food-delivery-70eee.appspot.com",
  messagingSenderId: "41473062935",
  appId: "1:41473062935:web:b84541d6496b6c6925c452",
  measurementId: "G-WE8RXDPP63",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
