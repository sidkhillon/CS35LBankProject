// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAltmJ2wbGGbdBgGgmrFlobjhen2EzduOQ",
  authDomain: "banking-portal-35l.firebaseapp.com",
  databaseURL: "https://banking-portal-35l-default-rtdb.firebaseio.com",
  projectId: "banking-portal-35l",
  storageBucket: "banking-portal-35l.appspot.com",
  messagingSenderId: "1007422976533",
  appId: "1:1007422976533:web:048b7512483e745fbfd41c",
  measurementId: "G-5NEX846XT0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);