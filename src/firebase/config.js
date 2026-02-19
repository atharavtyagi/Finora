import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6nn14MSPZmt0OncIweaSkXcMaLG0HQy4",
  authDomain: "finora-60cec.firebaseapp.com",
  projectId: "finora-60cec",
  storageBucket: "finora-60cec.firebasestorage.app",
  messagingSenderId: "24935876978",
  appId: "1:24935876978:web:cccb1eeaceee269b7575eb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
