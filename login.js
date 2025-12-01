const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailInput = document.getElementById("loginEmail").value;
  const passwordInput = document.getElementById("loginPass").value;

  // To get existing users
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // To find a user
  let foundUser = users.find(function (u) {
    return u.email === emailInput && u.password === passwordInput;
  });

  // To save the details of a current loggedin user
  if (foundUser) {
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    alert(`Welcome! ${foundUser.name}!`);
    window.location.href = "home.html";
  }

  // Go to Kaizen Todo-list App
  else {
    alert("invalid email or password");
  }
});
