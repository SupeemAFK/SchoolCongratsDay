// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfzUpMoCvkbabcEuOefKyplK8LvJs9xDw",
  authDomain: "patchim-5946c.firebaseapp.com",
  projectId: "patchim-5946c",
  storageBucket: "patchim-5946c.appspot.com",
  messagingSenderId: "987133083463",
  appId: "1:987133083463:web:5557e23f2f416029091662",
  measurementId: "G-CWEECL3EEV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);