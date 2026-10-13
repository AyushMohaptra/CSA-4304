// Hardcoded demo student account
const DEMO_USER = "student";
const DEMO_PASSWORD = "cake123";

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const message = document.getElementById("message");
  if (user === DEMO_USER && pass === DEMO_PASSWORD) {
    message.textContent = "Login successful! You can now shop for cakes.";
    localStorage.setItem("loggedIn", "student");
    setTimeout(() => location.href = "index.html", 700);
  } else {
    message.textContent = "Wrong username or password.";
  }
}
function register() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value;
  const message = document.getElementById("message");
  if (!user || !pass) { message.textContent = "Enter a username and password."; return; }
  message.textContent = "Demo registration complete. For login, use the hardcoded demo account shown on Login page.";
}
