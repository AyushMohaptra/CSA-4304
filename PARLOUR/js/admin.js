const MANAGER_USERNAME = "manager";
const MANAGER_PASSWORD = "salon123";
const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));

function managerLogin() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user === MANAGER_USERNAME && pass === MANAGER_PASSWORD) {
    document.getElementById("message").textContent = "Manager login successful.";
    document.getElementById("manager").hidden = false;
    showBookings();
  } else document.getElementById("message").textContent = "Incorrect manager username or password.";
}
function showBookings() {
  const date = document.getElementById("filterDate").value;
  const bookings = read("salonBookings", []).filter(b => !date || b.date === date);
  document.getElementById("bookings").innerHTML = bookings.map(b =>
    `<div class="booking"><b>${b.customer}</b> — ${b.service}<br>${b.date} at ${b.time} with ${b.stylist}<br>Payment: ${b.payment}<br>Status: <span class="status">${b.status}</span>
    ${b.status !== "Cancelled" ? `<button onclick="changeStatus(${b.id}, 'Completed')">Mark Completed</button><button onclick="changeStatus(${b.id}, 'Cancelled')">Cancel</button>` : ""}</div>`
  ).join("") || "No reservations found.";
}
function changeStatus(id, status) {
  const bookings = read("salonBookings", []);
  const booking = bookings.find(b => b.id === id);
  if (booking) booking.status = status;
  save("salonBookings", bookings); showBookings();
}
function lockSlot() {
  const date = document.getElementById("lockDate").value;
  const time = document.getElementById("lockTime").value;
  if (!date) { document.getElementById("lockMessage").textContent = "Choose a date first."; return; }
  const locked = read("salonLocked", []);
  if (!locked.some(s => s.date === date && s.time === time)) locked.push({date, time});
  save("salonLocked", locked);
  document.getElementById("lockMessage").textContent = "Time slot locked.";
}
