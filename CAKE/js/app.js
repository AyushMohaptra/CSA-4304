// Simple sample cake data
let cakes = JSON.parse(localStorage.getItem("cakes") || "null") || [
  { name: "Chocolate Cake", category: "Chocolate", price: 500 },
  { name: "Birthday Cake", category: "Birthday", price: 700 },
  { name: "Strawberry Cake", category: "Fruit", price: 450 }
];
let cart = [];

function showCakes() {
  const search = (document.getElementById("search").value || "").toLowerCase();
  const category = document.getElementById("category").value;
  const list = cakes.filter(c =>
    c.name.toLowerCase().includes(search) &&
    (category === "All" || c.category === category)
  );
  document.getElementById("cakes").innerHTML = list.map((c, i) =>
    `<div class="cake"><b>${c.name}</b> - ${c.category} - ₹${c.price}
    <button onclick="addToCart('${c.name.replace(/'/g, "\\'")}')">Add to Cart</button></div>`
  ).join("") || "No cakes found.";
}
function addToCart(name) {
  const cake = cakes.find(c => c.name === name);
  if (cake) cart.push(cake);
  showCart();
}
function showCart() {
  document.getElementById("cart").innerHTML = cart.map(c => `${c.name} - ₹${c.price}`).join("<br>") || "Cart is empty.";
  document.getElementById("total").textContent = "Total: ₹" + cart.reduce((sum, c) => sum + Number(c.price), 0);
}
function placeOrder() {
  if (!cart.length) return alert("Add a cake first.");
  const address = prompt("Enter delivery address:");
  if (!address) return;
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  orders.push({ items: cart.map(c => c.name).join(", "), total: cart.reduce((s,c) => s + Number(c.price),0), address, status: "Order placed" });
  localStorage.setItem("orders", JSON.stringify(orders));
  cart = [];
  showCart(); showOrders();
  alert("Demo order placed!");
}
function showOrders() {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  document.getElementById("orders").innerHTML = orders.map((o,i) => `Order ${i+1}: ${o.items} | ₹${o.total} | ${o.status}`).join("<br>") || "No orders yet.";
}
showCakes(); showCart(); showOrders();
