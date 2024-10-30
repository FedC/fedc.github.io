// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaj2yyd9V1ZewtTzi0HzJMqF18iD2cZe8",
  authDomain: "create-dwell.firebaseapp.com",
  projectId: "create-dwell",
  storageBucket: "create-dwell.appspot.com",
  messagingSenderId: "455762932168",
  appId: "1:455762932168:web:cefc0f7470159c6f1ad0fd",
  measurementId: "G-E5G32KQR13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);
