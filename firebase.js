import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDWTO8wPaggYkGuZHjH-G6S-R9Xd8ttZ1M",
  authDomain: "mindpal-e44b0.firebaseapp.com",
  projectId: "mindpal-e44b0",
  storageBucket: "mindpal-e44b0.appspot.com",
  messagingSenderId: "527835413525",
  appId: "1:527835413525:web:96e716825c49a29352621c",
  measurementId: "G-YVNFW0E4RJ"
};


const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);


const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export { auth, db, signUp };
