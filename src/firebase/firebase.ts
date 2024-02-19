let process: any;
const p = process?.env ? process.env : import.meta.env;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: p.VITE_FIREBASE_APIKEY,
  authDomain: p.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: p.VITE_FIREBASE_PROJECT_ID,
  storageBucket: p.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: p.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: p.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);