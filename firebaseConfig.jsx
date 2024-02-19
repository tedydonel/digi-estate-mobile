// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDplAsDLAyOy5xc5Mnr2PvS4pJVBiTJ-5A",
  authDomain: "digi-estate-8739e.firebaseapp.com",
  projectId: "digi-estate-8739e",
  storageBucket: "digi-estate-8739e.appspot.com",
  messagingSenderId: "516229661629",
  appId: "1:516229661629:web:b53acedefa6a79348288d4",
  measurementId: "G-6L7HQX5GXK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
