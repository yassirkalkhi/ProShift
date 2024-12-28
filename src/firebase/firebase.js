import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAQggdJADv8PdRzb3unjlUtK_CTHkbawJg",
  authDomain: "proshift-yassirkalkhi.firebaseapp.com",
  projectId: "proshift-yassirkalkhi",
  storageBucket: "proshift-yassirkalkhi.firebasestorage.app",
  messagingSenderId: "6160632128",
  appId: "1:6160632128:web:921a801f59f410ae6252a5",
  measurementId: "G-9RS72EVX3K"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);