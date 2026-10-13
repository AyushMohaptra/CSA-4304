const flights = [
  {no:"SKY 101", from:"Chennai", to:"Delhi", time:"06:30 AM", arrival:"09:30 AM", duration:"3h", economy:42, business:8, fare:5450},
  {no:"SKY 102", from:"Chennai", to:"Delhi", time:"04:15 PM", arrival:"07:20 PM", duration:"3h 5m", economy:31, business:5, fare:5890},
  {no:"SKY 202", from:"Bangalore", to:"Mumbai", time:"10:15 AM", arrival:"12:00 PM", duration:"1h 45m", economy:31, business:5, fare:3499},
  {no:"SKY 303", from:"Chennai", to:"Hyderabad", time:"02:45 PM", arrival:"04:05 PM", duration:"1h 20m", economy:26, business:3, fare:2999},
  {no:"SKY 404", from:"Delhi", to:"Mumbai", time:"08:00 AM", arrival:"10:10 AM", duration:"2h 10m", economy:37, business:7, fare:4299},
  {no:"SKY 505", from:"Mumbai", to:"Bangalore", time:"06:50 PM", arrival:"08:25 PM", duration:"1h 35m", economy:22, business:4, fare:3299}
];

function searchFlights() {
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const cls = document.getElementById("flightClass").value;
  const results = document.getElementById("flightResults");
  const message = document.getElementById("searchMessage");

  let found = flights.filter(f => f.from === from && f.to === to);

  if (cls !== "All") {
    found = found.filter(f => (cls === "Economy" ? f.economy : f.business) > 0);
  }

  results.innerHTML = "";

  if (found.length === 0) {
    message.innerHTML = '<div class="card">No flights found for the selected route/class.</div>';
    return;
  }

  message.innerHTML = "<p><b>" + found.length + " flight(s) found</b></p>";

  found.forEach(f => {
    const seats = cls === "Business" ? f.business : f.economy;
    const box = document.createElement("div");
    box.className = "flight-card";
    box.innerHTML =
      '<div class="flight-top"><h2>' + f.no + '</h2><span class="price">₹' + f.fare + '</span></div>' +
      '<p><b>' + f.from + '</b> → <b>' + f.to + '</b></p>' +
      '<p>' + f.time + ' → ' + f.arrival + ' &nbsp; | &nbsp; ' + f.duration + '</p>' +
      '<p>Economy: ' + f.economy + ' seats &nbsp; | &nbsp; Business: ' + f.business + ' seats</p>' +
      '<p class="confirmed">Available seats in selected class: ' + seats + '</p>' +
      '<a class="button" href="booking.html">Select Flight</a>';
    results.appendChild(box);
  });
}

document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("flightSearchForm");
  if (form) {
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const from = document.getElementById("from").value;
      const to = document.getElementById("to").value;
      if (from === to) {
        document.getElementById("searchMessage").innerHTML =
          '<div class="card">Origin and destination cannot be the same.</div>';
        document.getElementById("flightResults").innerHTML = "";
        return;
      }
      searchFlights();
    });
  }
});

function updateSeats() {
  const cls = document.getElementById("bookingClass").value;
  const text = document.getElementById("classText");
  const count = document.getElementById("seatCount");
  const seat = document.getElementById("seat");

  if (cls === "Business") {
    text.innerText = "Business";
    count.innerText = "8";
    seat.innerHTML = "<option>2A</option><option>2B</option><option>3A</option><option>3B</option><option>4A</option>";
  } else {
    text.innerText = "Economy";
    count.innerText = "42";
    seat.innerHTML = "<option>12A</option><option>12B</option><option>12C</option><option>13A</option><option>13B</option>";
  }
}

function goToPayment(event) {
  event.preventDefault();
  window.location.href = "payment.html";
}

function makePayment(event) {
  event.preventDefault();
  alert("Payment successful! Your PNR is SK4589217.");
  window.location.href = "my-ticket.html";
}

function customerLogin(event) {
  event.preventDefault();
  alert("Login successful.");
  window.location.href = "my-ticket.html";
}

function registerCustomer(event) {
  event.preventDefault();
  alert("Registration successful.");
  window.location.href = "login.html";
}

function forgotPassword(event) {
  event.preventDefault();
  alert("Password reset link sent to your email.");
}

function cancelFlight(event) {
  event.preventDefault();
  if (confirm("Cancel this flight ticket?")) {
    alert("Ticket cancelled. Refund request has been submitted.");
  }
}

function checkBooking(event) {
  event.preventDefault();
  const pnr = document.getElementById("statusPnr").value;
  document.getElementById("statusResult").innerHTML =
    '<div class="card"><h3>Booking Found</h3>' +
    '<p><b>PNR:</b> ' + pnr + '</p>' +
    '<p><b>Flight:</b> SKY 101 - Chennai to Delhi</p>' +
    '<p><b>Status:</b> <span class="confirmed">Confirmed</span></p>' +
    '<p><b>Seat:</b> 12A</p></div>';
}

function sendFeedback(event) {
  event.preventDefault();
  alert("Thank you! Your feedback has been submitted.");
}

function adminLogin(event) {
  event.preventDefault();
  alert("Administrator login successful.");
  window.location.href = "admin.html";
}

function adminSave(event) {
  event.preventDefault();
  alert("Flight information saved.");
}

function deleteUser() {
  if (confirm("Delete this user?")) {
    alert("User deleted.");
  }
}
