import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9dTPhLKod2StNAszVW7XkXV86Xz4krss",
  authDomain: "to-do-task-b918c.firebaseapp.com",
  projectId: "to-do-task-b918c",
  storageBucket: "to-do-task-b918c.appspot.com",
  messagingSenderId: "865852695640",
  appId: "1:865852695640:web:2c705138c0b96cb7b7162d",
  measurementId: "G-XXY38MYJ5B"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);