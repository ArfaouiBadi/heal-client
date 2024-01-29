import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
// ... other firebase imports

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyAdO60KDBaMrctYpFqOiGE-m3E531qtVn4",
  authDomain: "heal-f4bfc.firebaseapp.com",
  databaseURL: "https://heal-f4bfc-default-rtdb.firebaseio.com",
  projectId: "heal-f4bfc",
  storageBucket: "heal-f4bfc.appspot.com",
  messagingSenderId: "86607219025",
  appId: "1:86607219025:web:8a50907d4ee661a5c5eb70",
  measurementId: "G-QTVWZ19EWK",
});

// used for the firestore refs
const db = getFirestore(firebaseApp);

// here we can export reusable database references
export const todosRef = collection(db, "images");
