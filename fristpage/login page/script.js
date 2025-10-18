// Toggle password visibility
function togglePassword(id) {
    const passwordInput = document.getElementById(id);
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
}

// Toggle between Login and Signup forms
function toggleForms() {
    const loginContainer = document.getElementById("loginContainer");
    const signupContainer = document.getElementById("signupContainer");
    loginContainer.classList.toggle("hidden");
    signupContainer.classList.toggle("hidden");
}

// Validate and handle login form
// document.getElementById("loginForm").addEventListener("submit", function (event) {
//     event.preventDefault(); // Stop form from submitting normally

//     const username = document.getElementById("loginUsername").value.trim();
//     const password = document.getElementById("loginPassword").value.trim();

//     if (username === "" || password === "") {
//         alert("Please fill in both fields.");
//     } else {
//         alert("Login successful!");
//         // Redirect to your main page (relative path)
//         window.location.href = "C:/Users/Singh%20ji/om/gamming%20website/main%20page/index.html";
//     }
// });

// Validate and handle signup form
// document.getElementById("signupForm").addEventListener("submit", function (event) {
//     event.preventDefault();

//     const username = document.getElementById("signupUsername").value.trim();
//     const email = document.getElementById("signupEmail").value.trim();
//     const password = document.getElementById("signupPassword").value.trim();

//     if (!username || !email || !password) {
//         alert("All fields are required.");
//     } else {
//         alert("Account created successfully!");
//         // You can store data or redirect to a thank-you page here
//         toggleForms(); // Optional: switch back to login after signup
//     }
// });
