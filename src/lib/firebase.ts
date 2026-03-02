import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTht3DnfDVkOOhG88JOYY_SMWSN37jOxg",
  authDomain: "futurestack-ce07b.firebaseapp.com",
  projectId: "futurestack-ce07b",
  storageBucket: "futurestack-ce07b.firebasestorage.app",
  messagingSenderId: "60847101653",
  appId: "1:60847101653:web:13071fa9d100931f5db45c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
