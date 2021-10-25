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

// const auth = firebaseAuth.getAuth();
// firebaseAuth.onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     alert('ji')
//   } else {
//     // User is signed out
//     // ...
//   }
// });

export {app, firebaseAuth, firestore}