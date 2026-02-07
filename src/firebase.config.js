// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCulMOr_YCJHkDe5D13RINj_uBj1ESqgyg",
  authDomain: "online-job-portal-9c778.firebaseapp.com",
  projectId: "online-job-portal-9c778",
  storageBucket: "online-job-portal-9c778.firebasestorage.app",
  messagingSenderId: "939631308964",
  appId: "1:939631308964:web:ee61f22b4549c0dc18b631"
};

// Initialize Firebase

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
export{db};
