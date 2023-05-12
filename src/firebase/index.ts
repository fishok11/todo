// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBh-KjNE_LE0tZxQL5YuC13k4J9m27nWHQ",
  authDomain: "anonymous-santa-3f0dd.firebaseapp.com",
  projectId: "anonymous-santa-3f0dd",
  storageBucket: "anonymous-santa-3f0dd.appspot.com",
  messagingSenderId: "426333061494",
  appId: "1:426333061494:web:79650d25d9337a1b603a57",
  measurementId: "G-CB78G1C6SD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app) 
 
export default db;