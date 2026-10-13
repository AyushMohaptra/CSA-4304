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

function searchTrains(event) {
  event.preventDefault();
  var from = document.getElementById("fromStation").value;
  var to = document.getElementById("toStation").value;
  var date = document.getElementById("journeyDate").value;

  if (from === to) {
    alert("Origin and destination cannot be the same.");
    return;
  }

  window.location.href =
    "trains.html?from=" + encodeURIComponent(from) +
    "&to=" + encodeURIComponent(to) +
    "&date=" + encodeURIComponent(date);
}

function filterTrains(event) {
  event.preventDefault();
  var from = document.getElementById("searchFrom").value;
  var to = document.getElementById("searchTo").value;
  var cards = document.querySelectorAll(".train-card");
  var found = 0;

  if (from === to) {
    document.getElementById("searchMessage").innerHTML =
      "Origin and destination cannot be the same.";
    cards.forEach(function(card) { card.style.display = "none"; });
    document.getElementById("noResults").classList.remove("hidden");
    return;
  }

  cards.forEach(function(card) {
    if (card.dataset.from === from && card.dataset.to === to) {
      card.style.display = "flex";
      found++;
    } else {
      card.style.display = "none";
    }
  });

  document.getElementById("searchMessage").innerHTML =
    found + " train(s) found for " + from + " → " + to + ".";

  if (found === 0) document.getElementById("noResults").classList.remove("hidden");
  else document.getElementById("noResults").classList.add("hidden");
}

function updateAvailability() {
  var train = document.getElementById("bookTrain").value;
  var cls = document.getElementById("classType").value;
  var result = document.getElementById("availability");

  var seats = {
    "Chennai Express|AC 2 Tier": 12,
    "Chennai Express|AC 3 Tier": 20,
    "Chennai Express|Sleeper": 45,
    "Kaveri Express|AC 3 Tier": 16,
    "Kaveri Express|Sleeper": 30,
    "Coimbatore Intercity|AC Chair Car": 25,
    "Coimbatore Intercity|Second Sitting": 60
  };

  if (train && cls) {
    var count = seats[train + "|" + cls] || 0;
    result.innerHTML = count > 0 ? count + " seats available" : "Not available";
  } else {
    result.innerHTML = "Select train and class";
  }
}

function bookTicket(event) {
  event.preventDefault();
  alert("Payment successful. Ticket confirmed! PNR: 4589217345");
  window.location.href = "ticket.html";
}

function checkPNR(event) {
  event.preventDefault();
  var pnr = document.getElementById("pnr").value;
  var result = document.getElementById("pnrResult");
  result.style.display = "block";
  result.innerHTML =
    "<h3>PNR: " + pnr + "</h3>" +
    "<p><b>Status:</b> Confirmed</p>" +
    "<p><b>Train:</b> Chennai Express - 12601</p>" +
    "<p><b>Class:</b> AC 3 Tier</p>" +
    "<p><b>Seat:</b> B2 - 32</p>";
}

function cancelTicket() {
  if (confirm("Cancel this ticket?")) {
    alert("Ticket cancelled. Refund request sent to admin.");
    window.location.href = "cancel.html";
  }
}

function cancelByPNR(event) {
  event.preventDefault();
  alert("Cancellation request submitted. Refund will be processed according to refund rules.");
}

function printTicket() {
  window.location.href = "ticket.html";
}

function saveTrain(event) {
  event.preventDefault();
  alert("Train details saved (demo).");
}

function saveFare(event) {
  event.preventDefault();
  alert("Fare details saved (demo).");
}

function saveRefund(event) {
  event.preventDefault();
  alert("Refund rule saved (demo).");
}

function deleteUser() {
  if (confirm("Delete this passenger?")) alert("Passenger deleted (demo).");
}
