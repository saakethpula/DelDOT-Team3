// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpPPNVjjFcGhQb9b-ik8xOcDtOKudhf-k",
  authDomain: "deldot-dmv-ccm-tool.firebaseapp.com",
  databaseURL: "https://deldot-dmv-ccm-tool-default-rtdb.firebaseio.com",
  projectId: "deldot-dmv-ccm-tool",
  storageBucket: "deldot-dmv-ccm-tool.firebasestorage.app",
  messagingSenderId: "598731528486",
  appId: "1:598731528486:web:44210555289bfde78fc9e7",
  measurementId: "G-PJE6YRG86W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
