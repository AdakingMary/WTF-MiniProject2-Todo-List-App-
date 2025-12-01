document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("regName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;

    // To get existing users
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the user already exits
    let userExists = users.some(function (u) {
      return u.email === email;
    });

    if (userExists) {
      alert("Email already registered! Please login.");
      return;
    }

    // To create new users
    const newUser = {
      name,
      email,
      password,
    };

    //To add a new user
    users.push(newUser);

    //   Enable saving to local storage
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Succefull! Please login.");
    window.location.href = "index.html";
  });
});
