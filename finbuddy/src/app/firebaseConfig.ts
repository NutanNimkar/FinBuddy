import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "finbuddy-3769d.firebaseapp.com",
  projectId: "finbuddy-3769d",
  storageBucket: "finbuddy-3769d.firebasestorage.app",
  messagingSenderId: "812591531663",
  appId: "1:812591531663:web:ca7f00a123f91f46c192fa",
  measurementId: "G-41SLQR7C1K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);