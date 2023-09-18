import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVrGdzVGra3WBKjGOUSB65TgUCPNeeu9E",
  authDomain: "flowfidb.firebaseapp.com",
  projectId: "flowfidb",
  storageBucket: "flowfidb.appspot.com",
  messagingSenderId: "716369337101",
  appId: "1:716369337101:web:c186f1c65d13695b552e44",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
