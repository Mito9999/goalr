import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const clientCredentials = {
  apiKey: "AIzaSyAImURlXpYUPJyvA_H8CJ9Jjur2CmejDzg",
  authDomain: "goalr-1.firebaseapp.com",
  projectId: "goalr-1",
  storageBucket: "goalr-1.appspot.com",
  messagingSenderId: "840198015923",
  appId: "1:840198015923:web:f918c6cf5a442d83dd19c6",
};

if (!getApps().length) {
  initializeApp(clientCredentials);
}

const firebaseApp = getApp();

export default firebaseApp;

export const createUserWithEmail = (email, password) => {
  const auth = getAuth();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
      // ..
    });
};

export const signInWithEmail = (email, password) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
    });
};

export const logOut = () => {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("Logged out");
    })
    .catch((error) => {
      // An error happened.
      console.log("Sign out error");
    });
};
