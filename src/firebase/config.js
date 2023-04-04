// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMiQ6VzoUluwsSXv9Zq93J6EX37pLbU20",
  authDomain: "react-cursos-fd10b.firebaseapp.com",
  projectId: "react-cursos-fd10b",
  storageBucket: "react-cursos-fd10b.appspot.com",
  messagingSenderId: "253744254375",
  appId: "1:253744254375:web:431b4a9ca0afa7baa2ba82"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB= getFirestore( FirebaseApp );
