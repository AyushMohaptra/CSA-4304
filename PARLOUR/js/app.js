const services = [
  {name:"Haircut", price:250, description:"Hair trimming and styling"},
  {name:"Facial", price:600, description:"Refreshing facial treatment"},
  {name:"Manicure", price:300, description:"Nail cleaning and polish"},
  {name:"Hair Colour", price:900, description:"Hair colouring service"},
  {name:"Bridal Makeup", price:3500, description:"Makeup for your special day"}
];
const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));

function showServices() {
  const query = (document.getElementById("search").value || "").toLowerCase();
  document.getElementById("services").innerHTML = services.filter(s => s.name.toLowerCase().includes(query))
    .map(s => `<div class="service"><b>${s.name}</b> — ₹${s.price}<p>${s.description}</p></div>`).join("") || "No services found.";
}
function bookAppointment() {
  const customer = document.getElementById("customer").value.trim();
  const service = document.getElementById("service").value;
  const stylist = document.getElementById("stylist").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const payment = document.getElementById("payment").value;
  const message = document.getElementById("message");
  if (!customer || !date) { message.textContent = "Please enter your name and appointment date."; return; }
  if (date < new Date().toISOString().slice(0,10)) { message.textContent = "Please select today or a future date."; return; }
  const bookings = read("salonBookings", []);
  const locked = read("salonLocked", []);
  if (locked.some(s => s.date === date && s.time === time)) { message.textContent = "Sorry, this time slot is unavailable."; return; }
  if (bookings.some(b => b.date === date && b.time === time && b.stylist === stylist && b.status !== "Cancelled")) { message.textContent = "This stylist is already booked for that time."; return; }
  bookings.push({id:Date.now(), customer, service, stylist, date, time, payment, status:"Booked"});
  save("salonBookings", bookings);
  message.textContent = "Appointment booked successfully!";
  showMyAppointments();
}
function showMyAppointments() {
  const bookings = read("salonBookings", []);
  document.getElementById("myAppointments").innerHTML = bookings.map(b =>
    `<div class="booking"><b>${b.service}</b> with ${b.stylist}<br>${b.date} at ${b.time}<br>Payment: ${b.payment}<br>Status: <span class="status">${b.status}</span>
    ${b.status !== "Cancelled" ? `<button onclick="cancelAppointment(${b.id})">Cancel</button>` : ""}</div>`
  ).join("") || "No appointments yet.";
}
function cancelAppointment(id) {
  const bookings = read("salonBookings", []);
  const booking = bookings.find(b => b.id === id);
  if (booking) booking.status = "Cancelled";
  save("salonBookings", bookings); showMyAppointments();
}
function sendFeedback() {
  const feedback = document.getElementById("feedback").value.trim();
  if (!feedback) { document.getElementById("feedbackMessage").textContent = "Please write some feedback."; return; }
  const list = read("salonFeedback", []); list.push(feedback); save("salonFeedback", list);
  document.getElementById("feedbackMessage").textContent = "Thank you for your feedback!";
  document.getElementById("feedback").value = "";
}
showServices(); showMyAppointments();
