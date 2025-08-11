import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "use your key",
   authDomain: "use your domain",
  projectId: "use your project id",
  storageBucket: "firebasestorage.app",
  messagingSenderId: "use your missing id",
  appId: "use your app id",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

