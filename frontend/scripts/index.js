const baseURL = "http://localhost:3030"

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("#login form");
    const signupForm = document.querySelector("#register form");
  
    // Function to handle login form submission
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      // Get user input
      const email = loginForm.querySelector('input[type="email"]').value;
      const password = loginForm.querySelector('input[type="password"]').value;
  
      // You can perform client-side validation here if needed
  
      // Send login data to the server (you should replace this with your API endpoint)
      fetch(`${baseURL}/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle server response, e.g., show a success message and redirect
          alert("Login Successful");
          localStorage.setItem('token',data.token)
          // Redirect to the next page or perform other actions
          window.location.href = "html/postClassifieds.html"
        })
        .catch((error) => {
          // Handle errors, e.g., show an error message
          alert("Invalid Credentials. Please try again.");
        });
    });
  
    // Function to handle signup form submission
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      // Get user input
      const email = signupForm.querySelector('input[type="email"]').value;
      const password = signupForm.querySelector('input[type="password"]').value;
      const confirmPassword = signupForm.querySelector('input[type="confirmPassword"]').value;
  
      // You can perform client-side validation here if needed
  
      // Check if passwords match
      if (password !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
      }
  
      // Send signup data to the server (you should replace this with your API endpoint)
      fetch(`${baseURL}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, confirmPassword }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle server response, e.g., show a success message and redirect
          alert("Registration Successful");
          // Redirect to the next page or perform other actions
          signupForm.reset()
        })
        .catch((error) => {
          // Handle errors, e.g., show an error message
          alert("Registration failed. Please try again.");
        });
    });
  });

  