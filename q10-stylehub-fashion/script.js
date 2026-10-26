let fashionItems = JSON.parse(localStorage.getItem('stylehub_items')) || [
  { id: 1, name: "Oxford Cotton Formal Shirt", cat: "men", subcat: "Formal Shirts", price: 1499, popularity: 95, sizes: ["M", "L", "XL"], inStock: true },
  { id: 2, name: "Floral Summer Sundress", cat: "women", subcat: "Dresses", price: 2199, popularity: 98, sizes: ["S", "M", "L"], inStock: true },
  { id: 3, name: "Classic Italian Leather Loafers", cat: "footwear", subcat: "Loafers", price: 3499, popularity: 91, sizes: ["7", "8", "9", "10"], inStock: true },
  { id: 4, name: "Tailored Slim Linen Trousers", cat: "men", subcat: "Trousers", price: 1899, popularity: 89, sizes: ["32", "34", "36"], inStock: true },
  { id: 5, name: "Boho Chiffon Midi Dress", cat: "women", subcat: "Dresses", price: 2499, popularity: 93, sizes: ["S", "M", "L", "XL"], inStock: true },
  { id: 6, name: "Urban Streetwear Knit Hoodie", cat: "men", subcat: "Casual Tees", price: 1799, popularity: 90, sizes: ["M", "L", "XL"], inStock: true },
  { id: 7, name: "Low-Top Canvas Sneakers", cat: "footwear", subcat: "Sneakers", price: 1999, popularity: 88, sizes: ["6", "7", "8", "9"], inStock: true },
  { id: 8, name: "Junior Organic Cotton Dungarees", cat: "kids", subcat: "Party Wear", price: 1299, popularity: 86, sizes: ["4-5Y", "6-7Y"], inStock: true }
];

let fashionBag = JSON.parse(localStorage.getItem('stylehub_bag')) || [];

function saveFashionItems() {
  localStorage.setItem('stylehub_items', JSON.stringify(fashionItems));
}

function filterAndSortFashion() {
  const grid = document.getElementById('fashionGrid');
  if (!grid) return;

  const searchInput = document.getElementById('fashionSearch');
  const catFilter = document.getElementById('fashionCategory');
  const subcatFilter = document.getElementById('fashionSubcategory');
  const sortFilter = document.getElementById('fashionSort');

  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const selectedCat = catFilter ? catFilter.value : 'all';
  const selectedSubcat = subcatFilter ? subcatFilter.value : 'all';
  const sortVal = sortFilter ? sortFilter.value : 'popular';

  let items = [...fashionItems];

  if (query) {
    items = items.filter(i => 
      i.name.toLowerCase().includes(query) || 
      i.cat.toLowerCase().includes(query) || 
      (i.subcat && i.subcat.toLowerCase().includes(query))
    );
  }

  if (selectedCat !== 'all') {
    items = items.filter(i => i.cat === selectedCat);
  }

  if (selectedSubcat !== 'all') {
    items = items.filter(i => i.subcat === selectedSubcat);
  }

  if (sortVal === 'price_low') {
    items.sort((a, b) => a.price - b.price);
  } else if (sortVal === 'price_high') {
    items.sort((a, b) => b.price - a.price);
  } else if (sortVal === 'name') {
    items.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    items.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
  }

  renderFashionList(items);
}

function onFashionCategoryChange() {
  const catFilter = document.getElementById('fashionCategory');
  const subcatFilter = document.getElementById('fashionSubcategory');
  if (!catFilter || !subcatFilter) return;

  const selCat = catFilter.value;
  const subcats = new Set();
  fashionItems.forEach(i => {
    if (selCat === 'all' || i.cat === selCat) {
      if (i.subcat) subcats.add(i.subcat);
    }
  });

  subcatFilter.innerHTML = '<option value="all">All Subcategories</option>';
  subcats.forEach(sc => {
    subcatFilter.innerHTML += `<option value="${sc}">${sc}</option>`;
  });

  filterAndSortFashion();
}

function selectFashionPill(cat) {
  const catFilter = document.getElementById('fashionCategory');
  if (catFilter) {
    catFilter.value = cat;
    onFashionCategoryChange();
  }
}

function renderFashionList(items) {
  const grid = document.getElementById('fashionGrid');
  if (!grid) return;

  if (items.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1; padding:2rem; text-align:center; color:#64748b;">No apparel matching your filters.</div>';
    return;
  }

  grid.innerHTML = '';
  items.forEach(item => {
    let sizeOptions = (item.sizes || ["S", "M", "L"]).map(s => `<option value="${s}">${s}</option>`).join('');
    grid.innerHTML += `
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="badge-tag">${item.cat.toUpperCase()}</span>
          <span style="font-size:0.75rem; color:#f59e0b; font-weight:600;">★ Popularity: ${item.popularity || 85}%</span>
        </div>
        <h3 style="margin-top:0.5rem;">${item.name}</h3>
        <p style="font-size:0.85rem; color:#64748b;">Subcategory: <strong>${item.subcat || 'Apparel'}</strong></p>
        <p style="font-weight:700; color:var(--primary); font-size:1.2rem; margin:0.5rem 0;">₹${item.price.toLocaleString('en-IN')}</p>
        <div class="form-group" style="margin-bottom:0.75rem;">
          <label style="font-size:0.8rem;">Select Size:</label>
          <select id="size-${item.id}" style="padding:0.4rem; width:100%;">${sizeOptions}</select>
        </div>
        <button class="btn btn-sm" style="width:100%;" onclick="addFashionToBag(${item.id})">Add to Bag</button>
      </div>
    `;
  });
}

function addFashionToBag(id) {
  const item = fashionItems.find(i => i.id === id);
  const sizeSelect = document.getElementById('size-' + id);
  const chosenSize = sizeSelect ? sizeSelect.value : 'M';
  fashionBag.push({ id: item.id, name: item.name, price: item.price, size: chosenSize, qty: 1 });
  localStorage.setItem('stylehub_bag', JSON.stringify(fashionBag));
  alert(`${item.name} (Size: ${chosenSize}) added to bag!`);
}

function renderBag() {
  const tbody = document.getElementById('fashionCartBody');
  const totalEl = document.getElementById('fashionGrandTotal');
  if (!tbody) return;
  tbody.innerHTML = '';
  let sum = 0;
  fashionBag.forEach((item, idx) => {
    sum += item.price * item.qty;
    tbody.innerHTML += `
      <tr>
        <td><strong>${item.name}</strong></td>
        <td><span class="badge-tag">${item.size}</span></td>
        <td>₹${item.price}</td>
        <td>${item.qty}</td>
        <td>₹${item.price * item.qty}</td>
        <td><button class="btn btn-danger btn-sm" onclick="removeFashion(${idx})">Remove</button></td>
      </tr>
    `;
  });
  if (totalEl) totalEl.innerText = "₹" + sum.toLocaleString('en-IN');
}

function removeFashion(idx) {
  fashionBag.splice(idx, 1);
  localStorage.setItem('stylehub_bag', JSON.stringify(fashionBag));
  renderBag();
}

function renderCheckoutSummary() {
  const box = document.getElementById('fashionCheckoutSummary');
  if (!box) return;
  const bag = JSON.parse(localStorage.getItem('stylehub_bag') || '[]');
  if (bag.length === 0) {
    box.innerHTML = '<p>Your shopping bag is empty. <a href="index.html">Browse collections</a> first.</p>';
    return;
  }
  let sum = 0;
  let itemsHtml = bag.map(i => {
    sum += i.price * i.qty;
    return `<li>${i.name} (Size: ${i.size}) - <strong>₹${i.price}</strong></li>`;
  }).join('');
  box.innerHTML = `
    <ul style="padding-left:1.2rem; margin-bottom:1rem;">${itemsHtml}</ul>
    <h3 style="color:var(--primary);">Total Amount: ₹${sum.toLocaleString('en-IN')}</h3>
  `;
}

function submitFashionCheckout(e) {
  e.preventDefault();
  const bag = JSON.parse(localStorage.getItem('stylehub_bag') || '[]');
  if (bag.length === 0) {
    alert("Your shopping bag is empty!");
    return;
  }
  const name = document.getElementById('custName').value.trim();
  const email = document.getElementById('custEmail').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const address = document.getElementById('custAddress').value.trim();
  const payment = document.getElementById('custPayment').value;
  
  const total = bag.reduce((acc, i) => acc + (i.price * i.qty), 0);
  const orderId = 'SH-' + Math.floor(10000 + Math.random() * 90000);
  
  const customers = JSON.parse(localStorage.getItem('stylehub_checkout_customers') || '[]');
  customers.unshift({
    orderId,
    name,
    email,
    phone,
    address,
    payment,
    items: bag.map(i => `${i.name} (${i.size})`).join(', '),
    total,
    date: new Date().toLocaleDateString()
  });
  localStorage.setItem('stylehub_checkout_customers', JSON.stringify(customers));

  const orders = JSON.parse(localStorage.getItem('stylehub_orders') || '[]');
  orders.unshift({
    orderId,
    name,
    total,
    status: 'Order Placed',
    date: new Date().toLocaleDateString()
  });
  localStorage.setItem('stylehub_orders', JSON.stringify(orders));

  localStorage.removeItem('stylehub_bag');
  fashionBag = [];

  const alertBox = document.getElementById('fashionCheckoutAlert');
  alertBox.innerHTML = `
    <div class="card" style="background:#ecfdf5; border-color:#a7f3d0; color:#065f46; margin-top:1rem;">
      <h3>Order Placed Successfully!</h3>
      <p>Tracking Order ID: <strong>${orderId}</strong></p>
      <p>Customer: ${name} | Total: <strong>₹${total.toLocaleString('en-IN')}</strong> (${payment})</p>
      <div style="margin-top:1rem;">
        <a href="orders.html?id=${orderId}" class="btn btn-sm">Track Logistics Status →</a>
      </div>
    </div>
  `;
  e.target.reset();
}

function trackFashionOrder() {
  const query = document.getElementById('trackOrderId').value.trim().toUpperCase();
  const res = document.getElementById('trackingResult');
  if (!res) return;
  const orders = JSON.parse(localStorage.getItem('stylehub_orders') || '[]');
  const ord = orders.find(o => o.orderId.toUpperCase() === query);
  if (!ord) {
    res.innerHTML = `<div class="card" style="background:#fef2f2; color:#991b1b; margin-top:1rem;">No order found for ID: ${query}</div>`;
    return;
  }
  res.innerHTML = `
    <div class="card" style="background:#f8fafc; margin-top:1rem;">
      <h3>Order: ${ord.orderId}</h3>
      <p>Customer: <strong>${ord.name}</strong> | Amount: <strong>₹${ord.total.toLocaleString('en-IN')}</strong></p>
      <div style="margin:1rem 0; padding:1rem; background:white; border-radius:6px; border:1px solid #cbd5e1;">
        <p>Logistics Status:</p>
        <h4 style="color:var(--primary); font-size:1.2rem; margin-top:0.25rem;">● ${ord.status}</h4>
      </div>
      <p style="font-size:0.85rem; color:#64748b;">Progression: Order Placed → Packaging → Shipped → Out for Delivery → Delivered</p>
    </div>
  `;
}

// Admin Functions
function renderFashionAdmin() {
  const tbody = document.getElementById('fashionAdminBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  fashionItems.forEach((item) => {
    tbody.innerHTML += `
      <tr>
        <td>#${item.id}</td>
        <td><strong>${item.name}</strong></td>
        <td><span class="badge-tag">${item.cat.toUpperCase()}</span></td>
        <td>₹<input type="number" value="${item.price}" id="price-${item.id}" style="width:90px; padding:3px 6px;"></td>
        <td>
          <button class="btn btn-sm" onclick="adminModifyFashionPrice(${item.id})">Update Price</button>
          <button class="btn btn-danger btn-sm" onclick="deleteFashionItem(${item.id})">Remove</button>
        </td>
      </tr>
    `;
  });
}

function addFashionItem(e) {
  if (e) e.preventDefault();
  const name = document.getElementById('fName').value.trim();
  const cat = document.getElementById('fCat').value;
  const subcat = document.getElementById('fSubcat') ? document.getElementById('fSubcat').value.trim() : 'Apparel';
  const price = parseFloat(document.getElementById('fPrice').value);
  if (!name || isNaN(price)) { alert('Enter valid outfit details'); return; }
  const newId = fashionItems.length > 0 ? Math.max(...fashionItems.map(i => i.id)) + 1 : 1;
  fashionItems.push({ id: newId, name, cat, subcat: subcat || 'Apparel', price, popularity: 80, sizes: ["S", "M", "L", "XL"] });
  saveFashionItems();
  renderFashionAdmin();
  alert(`Added new particular: "${name}" at ₹${price}`);
  document.getElementById('fName').value = '';
  document.getElementById('fPrice').value = '';
}

function adminModifyFashionPrice(id) {
  const input = document.getElementById(`price-${id}`);
  const newPrice = parseFloat(input.value);
  if (isNaN(newPrice) || newPrice <= 0) {
    alert("Please enter a valid price");
    return;
  }
  const item = fashionItems.find(i => i.id === id);
  if (item) {
    item.price = newPrice;
    saveFashionItems();
    alert(`Price of "${item.name}" modified to ₹${newPrice}`);
    renderFashionAdmin();
  }
}

function deleteFashionItem(id) {
  if (!confirm("Are you sure you want to remove this item?")) return;
  fashionItems = fashionItems.filter(i => i.id !== id);
  saveFashionItems();
  renderFashionAdmin();
}

function renderAdminCustomers() {
  const tbody = document.getElementById('stylehubCustomersBody');
  if (!tbody) return;
  const customers = JSON.parse(localStorage.getItem('stylehub_checkout_customers') || '[]');
  if (customers.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:#64748b;">No customer checkout logs yet.</td></tr>';
    return;
  }
  tbody.innerHTML = '';
  customers.forEach(c => {
    tbody.innerHTML += `
      <tr>
        <td><strong>${c.orderId}</strong></td>
        <td>${c.name}</td>
        <td>${c.email}<br><small>${c.phone}</small></td>
        <td>${c.address}</td>
        <td>${c.items}</td>
        <td><strong>₹${c.total.toLocaleString('en-IN')}</strong> (${c.payment})</td>
      </tr>
    `;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  onFashionCategoryChange();
  renderBag();
  renderCheckoutSummary();
  renderFashionAdmin();
  renderAdminCustomers();
});
