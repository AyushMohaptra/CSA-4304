function login(event) {
  event.preventDefault();
  alert("Login successful (demo).");
  window.location.href = "dashboard.html";
}

function registerUser(event) {
  event.preventDefault();
  alert("Registration successful (demo).");
  window.location.href = "login.html";
}

function forgotPassword(event) {
  event.preventDefault();
  alert("Password reset link sent (demo).");
}

function bookTicket(event) {
  event.preventDefault();
  alert("Payment successful. Ticket booked (demo).");
  window.location.href = "dashboard.html";
}

function cancelBooking() {
  if (confirm("Cancel this booking?")) {
    alert("Booking cancelled (demo).");
  }
}

function addComment(event) {
  event.preventDefault();
  alert("Comment posted (demo).");
}

function saveBus(event) {
  event.preventDefault();
  alert("Bus information saved (demo).");
}

function deleteUser() {
  if (confirm("Delete this user?")) {
    alert("User deleted (demo).");
  }
}
