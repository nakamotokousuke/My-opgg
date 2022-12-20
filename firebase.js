import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6r-vL4D0CUwtbf8WpZgMGv34lcQUmz0E",
  authDomain: "my-opgg.firebaseapp.com",
  projectId: "my-opgg",
  storageBucket: "my-opgg.appspot.com",
  messagingSenderId: "172310738115",
  appId: "1:172310738115:web:1a3a7b29c6619d92af1e76",
  measurementId: "G-MYVEJD5B2N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const db = getFirestore(app);