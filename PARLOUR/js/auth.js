// Hardcoded demo customer account
const DEMO_USERNAME = "customer";
const DEMO_PASSWORD = "glow123";

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const msg = document.getElementById("message");
  if (user === DEMO_USERNAME && pass === DEMO_PASSWORD) {
    msg.textContent = "Login successful!";
    localStorage.setItem("salonUser", user);
    setTimeout(() => location.href = "index.html", 600);
  } else msg.textContent = "Incorrect username or password.";
}
function register() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value;
  document.getElementById("message").textContent = user && pass
    ? "Demo registration successful. Use customer / glow123 on the login page."
    : "Please enter a username and password.";
}
