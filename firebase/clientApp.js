import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

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

// import { doc, setDoc } from "firebase/firestore";
// export const seedDb = async () => {
//   const db = getFirestore();
//   await setDoc(doc(db, "userGoals", "kGUGJq7wGwUhpBsfMZZyaUjT2EC2"), {
//     goals: [
//       {
//         title: "Reading",
//         data: [
//           { value: 92 },
//           { value: 105 },
//           { value: 94 },
//           { value: 102 },
//           { value: 103 },
//           { value: 100 },
//           { value: 106 },
//         ],
//         goal: 110,
//         units: "WPM",
//         inspiration: `Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.`,
//         isManualEntry: false,
//       },
//       {
//         title: "Weight Lifting",
//         data: [
//           { value: 150 },
//           { value: 150 },
//           { value: 155 },
//           { value: 160 },
//           { value: 160 },
//           { value: 160 },
//           { value: 165 },
//           { value: 165 },
//           { value: 170 },
//         ],
//         goal: 180,
//         units: "LBs",
//         inspiration: `Live the Life of Your Dreams: Be brave enough to live the life of your dreams according to your vision and purpose instead of the expectations and opinions of others.`,
//         isManualEntry: true,
//       },
//       {
//         title: "Passive Income",
//         data: [
//           { value: 100 },
//           { value: 110 },
//           { value: 120 },
//           { value: 95 },
//           { value: 140 },
//         ],
//         goal: 220,
//         units: "$",
//         inspiration: `Believe in yourself. You are braver than you think, more talented than you know, and capable of more than you imagine.`,
//         isManualEntry: true,
//       },
//     ],
//   });
// };
