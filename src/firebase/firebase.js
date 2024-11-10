import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

const API_KEY = process.env.PUBLIC_API_KEY; 

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "mini-social-873e5.firebaseapp.com",
  projectId: "mini-social-873e5",
  storageBucket: "mini-social-873e5.firebasestorage.app",
  messagingSenderId: "717658372657",
  appId: "1:717658372657:web:36b0497f5f8fafaa0ff310"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fireStore = getFirestore(app);
const storage = getStorage(app);

export {app, auth, fireStore, storage};