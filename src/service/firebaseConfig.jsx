// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfByyWl086IPSdp4_wCi9mx1Lg7m1R1AE",
  authDomain: "aitravelplanner-6fd24.firebaseapp.com",
  projectId: "aitravelplanner-6fd24",
  storageBucket: "aitravelplanner-6fd24.firebasestorage.app",
  messagingSenderId: "566023207893",
  appId: "1:566023207893:web:9772430c19a3f1ddbf1b5c",
  measurementId: "G-FSY52BHD15"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db =getFirestore(app);