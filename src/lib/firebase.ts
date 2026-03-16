import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBTht3DnfDVkOOhG88JOYY_SMWSN37jOxg",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "futurestack-ce07b.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "futurestack-ce07b",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "futurestack-ce07b.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "60847101653",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:60847101653:web:13071fa9d100931f5db45c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
