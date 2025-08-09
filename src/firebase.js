import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAX2RV2ia9IqnIo_4SaokrFWwV3THO-uwI",
   authDomain: "reactchat-549cb.firebaseapp.com",
  projectId: "reactchat-549cb",
  storageBucket: "reactchat-549cb.firebasestorage.app",
  messagingSenderId: "231432466093",
  appId: "1:231432466093:web:d813d53ba7ba6f44682024",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

