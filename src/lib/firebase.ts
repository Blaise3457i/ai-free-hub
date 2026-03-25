import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager, enableNetwork } from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Use initializeFirestore to enable long polling which is more reliable in restricted environments
// The signature is initializeFirestore(app, settings, databaseId)
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
}, firebaseConfig.firestoreDatabaseId || '(default)');

// Explicitly enable network to ensure connectivity
enableNetwork(db).catch(err => console.error("Failed to enable Firestore network:", err));
