
import { initializeApp } from "firebase/app";
import {getAuth} from  "firebase/auth";
import { getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAEMJaLSEsfihiCznw-ZjCORXGghTup2w8",
  authDomain: "test-46b1b.firebaseapp.com",
  projectId: "test-46b1b",
  storageBucket: "test-46b1b.firebasestorage.app",
  messagingSenderId: "1050729954762",
  appId: "1:1050729954762:web:06343f3e08ac6645742333"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);