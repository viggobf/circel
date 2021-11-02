import * as firebaseAuth from '@firebase/auth'
import { initializeApp } from "@firebase/app";
import * as firestore from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDGFdDCD1ZwvOzbvtWNxseRpSfOOz5dAro",
  authDomain: "circel-app.firebaseapp.com",
  projectId: "circel-app",
  storageBucket: "circel-app.appspot.com",
  messagingSenderId: "121186697586",
  appId: "1:121186697586:web:93874da3a21c182b219deb",
  measurementId: "G-72PCDLGBEL"
};

const app = initializeApp(firebaseConfig);


export {app, firebaseAuth, firestore}