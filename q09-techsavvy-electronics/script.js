
// TechSavvy - Main Script
let products = JSON.parse(localStorage.getItem('techsavvy_products')) || [
  { id: 1, name: "Pixel Pro 8", cat: "smartphones", price: 69999, desc: "High-end AI camera smartphone" },
  { id: 2, name: "Galaxy Book 4", cat: "laptops", price: 84999, desc: "Intel Core Ultra, 16GB RAM, 512GB SSD" },
  { id: 3, name: "Noise Pro Wireless Headphones", cat: "audio", price: 3499, desc: "Active Noise Cancellation with 40h playback" },
  { id: 4, name: "iPad Air M2", cat: "smartphones", price: 59900, desc: "Liquid Retina display & Apple M2 chip" }
];

let cart = JSON.parse(localStorage.getItem('techsavvy_cart')) || [];

function saveProducts() {
  localStorage.setItem('techsavvy_products', JSON.stringify(products));
}

function saveCart() {
  localStorage.setItem('techsavvy_cart', JSON.stringify(cart));
}

function renderProducts(list) {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  grid.innerHTML = '';
  list.forEach(p => {
    grid.innerHTML += `
      <div class="card">
        <span class="badge-tag">${p.cat.toUpperCase()}</span>
        <h3 style="margin-top:0.5rem;">${p.name}</h3>
        <p>${p.desc}</p>
        <p style="font-weight:700; color:var(--primary); font-size:1.1rem;">₹${p.price.toLocaleString('en-IN')}</p>
        <button class="btn btn-sm" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

function filterCat(cat) {
  if (cat === 'all') renderProducts(products);
  else renderProducts(products.filter(p => p.cat === cat));
}

function addToCart(id) {
  const item = products.find(p => p.id === id);
  if (!item) return;
  const existing = cart.find(c => c.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ id: item.id, name: item.name, price: item.price, qty: 1 });
  saveCart();
  alert(item.name + " added to cart!");
}

function renderCart() {
  const tbody = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  if (!tbody) return;
  tbody.innerHTML = '';
  let grandTotal = 0;
  cart.forEach((c, idx) => {
    const sub = c.price * c.qty;
    grandTotal += sub;
    tbody.innerHTML += `
      <tr>
        <td><strong>${c.name}</strong></td>
        <td>₹${c.price.toLocaleString('en-IN')}</td>
        <td>
          <input type="number" min="1" value="${c.qty}" style="width:60px;" onchange="updateQty(${idx}, this.value)">
        </td>
        <td>₹${sub.toLocaleString('en-IN')}</td>
        <td><button class="btn btn-danger btn-sm" onclick="removeItem(${idx})">Remove</button></td>
      </tr>
    `;
  });
  totalEl.innerText = "₹" + grandTotal.toLocaleString('en-IN');
}

function updateQty(idx, val) {
  cart[idx].qty = parseInt(val) || 1;
  saveCart();
  renderCart();
}

function removeItem(idx) {
  cart.splice(idx, 1);
  saveCart();
  renderCart();
}

function checkout() {
  if (cart.length === 0) { alert('Cart is empty!'); return; }
  const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
  document.getElementById('checkoutMsg').innerHTML = `
    <div class="alert alert-success">
      <h3>Order Placed Successfully!</h3>
      <p>Order Reference: <strong>${orderId}</strong></p>
      <p>A confirmation email has been dispatched. Thank you for shopping with TechSavvy!</p>
    </div>
  `;
  cart = [];
  saveCart();
  renderCart();
}

function renderAdmin() {
  const tbody = document.getElementById('adminItemList');
  if (!tbody) return;
  tbody.innerHTML = '';
  products.forEach((p, idx) => {
    tbody.innerHTML += `
      <tr>
        <td>#${p.id}</td>
        <td>${p.name}</td>
        <td>${p.cat}</td>
        <td>₹${p.price.toLocaleString('en-IN')}</td>
        <td><button class="btn btn-danger btn-sm" onclick="deleteProduct(${idx})">Delete</button></td>
      </tr>
    `;
  });
}

function addItem() {
  const name = document.getElementById('itemName').value;
  const cat = document.getElementById('itemCat').value;
  const price = parseFloat(document.getElementById('itemPrice').value);
  if (!name || isNaN(price)) { alert('Please enter valid product details'); return; }
  products.push({ id: Date.now(), name, cat, price, desc: "Added by Administrator" });
  saveProducts();
  renderAdmin();
  alert('Product added successfully!');
}

function deleteProduct(idx) {
  products.splice(idx, 1);
  saveProducts();
  renderAdmin();
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
  renderCart();
  renderAdmin();
});
