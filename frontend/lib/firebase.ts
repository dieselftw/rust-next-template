// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyCvwIPV9eJgJW-yc5-1bNOXQV0KJFNkEME",
  
    authDomain: "vertigo-27a6a.firebaseapp.com",
  
    projectId: "vertigo-27a6a",
  
    storageBucket: "vertigo-27a6a.appspot.com",
  
    messagingSenderId: "908057385625",
  
    appId: "1:908057385625:web:c443158d854e82cbcbf608",
  
    measurementId: "G-3YXR358L1R"
  
  };
  

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
