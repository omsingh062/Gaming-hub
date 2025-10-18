//   Code to setup Firebase (From the documentation)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBirZZt1DG5WFl5Q7M8PgO-JQvZCT3xyfw",
    authDomain: "gaming-hub-b764c.firebaseapp.com",
    projectId: "gaming-hub-b764c",
    storageBucket: "gaming-hub-b764c.firebasestorage.app",
    messagingSenderId: "456372590650",
    appId: "1:456372590650:web:7e0de3dfe1541dbccabd03",
    measurementId: "G-Y7WKD3HBN5"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("loginUsername").value;
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            alert("Login successful")
            localStorage.setItem("username", name)
            window.location.href ='./main page/index.html';

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode, errorMessage)
        });
});