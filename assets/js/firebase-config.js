// ========================================
// FIREBASE CONFIG - BTR Website
// Place this file in: assets/js/firebase-config.js
// ========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyChmE9bBye63M3MaX-87LviA0EBFUm0XDY",
    authDomain: "btr-bracelets.firebaseapp.com",
    projectId: "btr-bracelets",
    storageBucket: "btr-bracelets.firebasestorage.app",
    messagingSenderId: "545302188917",
    appId: "1:545302188917:web:5455c6c7a578d9278bb93c",
    measurementId: "G-0RVR3FGL52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Export for use in other files
export { auth, db, googleProvider };

console.log('✅ Firebase initialized - BTR Website');