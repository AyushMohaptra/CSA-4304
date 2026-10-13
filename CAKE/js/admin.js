const ADMIN_USER = "admin";
const ADMIN_PASSWORD = "admin123";
function adminLogin() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user === ADMIN_USER && pass === ADMIN_PASSWORD) {
    document.getElementById("message").textContent = "Admin login successful.";
    document.getElementById("admin").hidden = false;
    showAdminOrders();
  } else {
    document.getElementById("message").textContent = "Wrong admin username or password.";
  }
}
function addCake() {
  const name = document.getElementById("cakeName").value.trim();
  const category = document.getElementById("cakeCategory").value;
  const price = Number(document.getElementById("cakePrice").value);
  if (!name || price <= 0) return alert("Enter a cake name and a price greater than zero.");
  const cakes = JSON.parse(localStorage.getItem("cakes") || "null") || [
    { name: "Chocolate Cake", category: "Chocolate", price: 500 },
    { name: "Birthday Cake", category: "Birthday", price: 700 },
    { name: "Strawberry Cake", category: "Fruit", price: 450 }
  ];
  cakes.push({ name, category, price });
  localStorage.setItem("cakes", JSON.stringify(cakes));
  alert("Cake added. Return to Home to see it.");
  document.getElementById("cakeName").value = "";
  document.getElementById("cakePrice").value = "";
}
function showAdminOrders() {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  document.getElementById("adminOrders").innerHTML = orders.map((o, i) =>
    `<p>Order ${i+1}: ${o.items} - ₹${o.total} - ${o.address}
    <select onchange="updateStatus(${i}, this.value)">
      ${["Order placed","Preparing","Shipped","Delivered"].map(s => `<option ${s===o.status?"selected":""}>${s}</option>`).join("")}
    </select></p>`
  ).join("") || "No orders yet.";
}
function updateStatus(index, status) {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  orders[index].status = status;
  localStorage.setItem("orders", JSON.stringify(orders));
  showAdminOrders();
}
