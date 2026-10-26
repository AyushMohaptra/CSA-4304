// BlossomGifts - Core Logic with Live Inventory, Category/Subcategory Filtering, Sorting & Checkout
const defaultGifts = [
  { id: 1, name: "Midnight Red Rose Bouquet (24 Stems)", cat: "Flowers", subcat: "Roses", price: 1299, popularity: 98, inStock: true },
  { id: 2, name: "Ferrero Rocher & Orchid Hamper", cat: "Combos", subcat: "Chocolate Hampers", price: 2199, popularity: 95, inStock: true },
  { id: 3, name: "Personalized Crystal Photo Lamp", cat: "Personalized", subcat: "Keepsakes", price: 1599, popularity: 90, inStock: true },
  { id: 4, name: "Pastel Carnations in Ceramic Vase", cat: "Flowers", subcat: "Carnations", price: 999, popularity: 88, inStock: true },
  { id: 5, name: "Royal Blue Orchids Bouquet", cat: "Flowers", subcat: "Orchids", price: 1699, popularity: 92, inStock: true },
  { id: 6, name: "Black Forest Cake & Teddy Combo", cat: "Combos", subcat: "Cakes & Plush", price: 1450, popularity: 89, inStock: true },
  { id: 7, name: "Golden Pothos in Ceramic Planter", cat: "Plants", subcat: "Indoor Plants", price: 799, popularity: 84, inStock: true },
  { id: 8, name: "Custom Engraved Wooden Plaque", cat: "Personalized", subcat: "Woodcraft", price: 1199, popularity: 86, inStock: true }
];

function getGifts() {
  const stored = localStorage.getItem('blossom_items');
  if (!stored) {
    localStorage.setItem('blossom_items', JSON.stringify(defaultGifts));
    return defaultGifts;
  }
  return JSON.parse(stored);
}

function saveGifts(items) {
  localStorage.setItem('blossom_items', JSON.stringify(items));
}

let giftCart = JSON.parse(localStorage.getItem('blossom_cart') || '[]');

function filterAndSortGifts() {
  const grid = document.getElementById('giftGrid');
  if (!grid) return;

  const searchInput = document.getElementById('giftSearch');
  const catFilter = document.getElementById('giftCategory');
  const subcatFilter = document.getElementById('giftSubcategory');
  const sortFilter = document.getElementById('giftSort');
  const stockFilter = document.getElementById('giftStock');

  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const selectedCat = catFilter ? catFilter.value : 'all';
  const selectedSubcat = subcatFilter ? subcatFilter.value : 'all';
  const sortVal = sortFilter ? sortFilter.value : 'popular';
  const stockVal = stockFilter ? stockFilter.value : 'all';

  let items = getGifts();

  // Search filter
  if (query) {
    items = items.filter(i => 
      i.name.toLowerCase().includes(query) || 
      i.cat.toLowerCase().includes(query) || 
      (i.subcat && i.subcat.toLowerCase().includes(query))
    );
  }

  // Category filter
  if (selectedCat !== 'all') {
    items = items.filter(i => i.cat === selectedCat);
  }

  // Subcategory filter
  if (selectedSubcat !== 'all') {
    items = items.filter(i => i.subcat === selectedSubcat);
  }

  // Stock filter
  if (stockVal === 'instock') {
    items = items.filter(i => i.inStock !== false);
  }

  // Sorting
  if (sortVal === 'price_low') {
    items.sort((a, b) => a.price - b.price);
  } else if (sortVal === 'price_high') {
    items.sort((a, b) => b.price - a.price);
  } else if (sortVal === 'name') {
    items.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    // Default: Popularity (popular categories/items first)
    items.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
  }

  renderGiftList(items);
}

function onCategoryChange() {
  const catFilter = document.getElementById('giftCategory');
  const subcatFilter = document.getElementById('giftSubcategory');
  if (!catFilter || !subcatFilter) return;

  const selCat = catFilter.value;
  const items = getGifts();

  // Populate subcategories associated with this category
  const subcats = new Set();
  items.forEach(i => {
    if (selCat === 'all' || i.cat === selCat) {
      if (i.subcat) subcats.add(i.subcat);
    }
  });

  subcatFilter.innerHTML = '<option value="all">All Subcategories</option>';
  subcats.forEach(sc => {
    subcatFilter.innerHTML += `<option value="${sc}">${sc}</option>`;
  });

  filterAndSortGifts();
}

function renderGiftList(items) {
  const grid = document.getElementById('giftGrid');
  if (!grid) return;

  if (items.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1; padding:2rem; text-align:center; color:#64748b;">No gifts matching your search criteria.</div>';
    return;
  }

  grid.innerHTML = '';
  items.forEach(g => {
    grid.innerHTML += `
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="badge-tag">${g.cat}</span>
          <span style="font-size:0.75rem; color:#059669; font-weight:600;">● ${g.inStock !== false ? 'In Stock' : 'Out of Stock'}</span>
        </div>
        <h3 style="margin-top:0.5rem;">${g.name}</h3>
        <p style="font-size:0.85rem; color:#64748b;">Subcategory: <strong>${g.subcat || 'General'}</strong></p>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.75rem;">
          <p style="font-weight:700; color:var(--primary); font-size:1.2rem; margin:0;">₹${g.price}</p>
          <span style="font-size:0.8rem; color:#f59e0b; font-weight:600;">★ Popularity: ${g.popularity || 85}%</span>
        </div>
        <button class="btn btn-sm" style="margin-top:0.75rem; width:100%;" onclick="addGiftToCart(${g.id})">Add to Gift Box</button>
      </div>
    `;
  });
}

function selectCategoryPill(cat) {
  const catFilter = document.getElementById('giftCategory');
  if (catFilter) {
    catFilter.value = cat;
    onCategoryChange();
  }
}

function addGiftToCart(id) {
  const items = getGifts();
  const g = items.find(item => item.id === id);
  if (!g) return;
  giftCart.push({ id: g.id, name: g.name, price: g.price, qty: 1 });
  localStorage.setItem('blossom_cart', JSON.stringify(giftCart));
  alert(g.name + " added to your gift box!");
}

function renderGiftCart() {
  const tbody = document.getElementById('giftCartBody');
  const total = document.getElementById('giftTotal');
  if (!tbody) return;
  tbody.innerHTML = '';
  let sum = 0;
  giftCart.forEach((item, idx) => {
    sum += item.price;
    tbody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>₹${item.price}</td>
        <td>1</td>
        <td>₹${item.price}</td>
        <td><button class="btn btn-danger btn-sm" onclick="removeGift(${idx})">Remove</button></td>
      </tr>
    `;
  });
  if (total) total.innerText = "₹" + sum;
}

function removeGift(idx) {
  giftCart.splice(idx, 1);
  localStorage.setItem('blossom_cart', JSON.stringify(giftCart));
  renderGiftCart();
}

function renderCheckoutSummary() {
  const box = document.getElementById('checkoutSummary');
  if (!box) return;
  const cart = JSON.parse(localStorage.getItem('blossom_cart') || '[]');
  if (cart.length === 0) {
    box.innerHTML = '<p>Your gift box is empty. <a href="index.html">Select items</a> first.</p>';
    return;
  }
  let sum = 0;
  let itemsHtml = cart.map(i => {
    sum += i.price;
    return `<li>${i.name} - <strong>₹${i.price}</strong></li>`;
  }).join('');
  box.innerHTML = `
    <ul style="padding-left:1.2rem; margin-bottom:1rem;">${itemsHtml}</ul>
    <h3 style="color:var(--primary);">Total Payable: ₹${sum}</h3>
  `;
}

function submitCheckout(e) {
  e.preventDefault();
  const cart = JSON.parse(localStorage.getItem('blossom_cart') || '[]');
  if (cart.length === 0) {
    alert("Please add at least one gift item to your cart before checkout.");
    return;
  }
  const name = document.getElementById('custName').value.trim();
  const email = document.getElementById('custEmail').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const address = document.getElementById('custAddress').value.trim();
  const occasion = document.getElementById('custOccasion').value;
  const delDate = document.getElementById('custDate').value;
  const delSlot = document.getElementById('custSlot').value;
  const payment = document.getElementById('custPayment').value;
  
  let total = cart.reduce((acc, i) => acc + i.price, 0);
  const orderId = 'BLOSSOM-' + Math.floor(10000 + Math.random() * 90000);
  
  const customers = JSON.parse(localStorage.getItem('blossom_checkout_customers') || '[]');
  customers.unshift({
    orderId,
    name,
    email,
    phone,
    address,
    occasion,
    delDate,
    delSlot,
    payment,
    items: cart.map(i => i.name).join(', '),
    total,
    date: new Date().toLocaleDateString()
  });
  localStorage.setItem('blossom_checkout_customers', JSON.stringify(customers));

  const orders = JSON.parse(localStorage.getItem('blossom_orders') || '[]');
  orders.unshift({
    orderId,
    name,
    total,
    status: 'Order Placed',
    delDate,
    date: new Date().toLocaleDateString()
  });
  localStorage.setItem('blossom_orders', JSON.stringify(orders));

  localStorage.removeItem('blossom_cart');
  giftCart = [];

  const alertBox = document.getElementById('checkoutAlert');
  alertBox.innerHTML = `
    <div class="card" style="background:#ecfdf5; border-color:#a7f3d0; color:#065f46; margin-top:1rem;">
      <h3>Gift Order Placed Successfully!</h3>
      <p>Tracking Order ID: <strong>${orderId}</strong></p>
      <p>Recipient: ${name} | Occasion: ${occasion}</p>
      <p>Delivery: ${delDate} (${delSlot})</p>
      <p>Total Paid: <strong>₹${total}</strong> via ${payment}</p>
      <div style="margin-top:1rem;">
        <a href="orders.html?id=${orderId}" class="btn btn-sm">Track Order Status →</a>
      </div>
    </div>
  `;
  e.target.reset();
}

function trackGiftOrder() {
  const query = document.getElementById('trackOrderId').value.trim().toUpperCase();
  const res = document.getElementById('trackingResult');
  if (!res) return;
  const orders = JSON.parse(localStorage.getItem('blossom_orders') || '[]');
  const ord = orders.find(o => o.orderId.toUpperCase() === query);
  if (!ord) {
    res.innerHTML = `<div class="card" style="background:#fef2f2; color:#991b1b; margin-top:1rem;">No order found for ID: ${query}</div>`;
    return;
  }
  res.innerHTML = `
    <div class="card" style="background:#f8fafc; margin-top:1rem;">
      <h3>Order: ${ord.orderId}</h3>
      <p>Recipient: <strong>${ord.name}</strong> | Total: <strong>₹${ord.total}</strong></p>
      <p>Target Delivery Date: ${ord.delDate}</p>
      <div style="margin:1rem 0; padding:1rem; background:white; border-radius:6px; border:1px solid #cbd5e1;">
        <p>Current Logistics Status:</p>
        <h4 style="color:var(--primary); font-size:1.2rem; margin-top:0.25rem;">● ${ord.status}</h4>
      </div>
      <p style="font-size:0.85rem; color:#64748b;">Step progression: Order Placed → Florist Arranging Flowers → Out for Delivery → Delivered</p>
    </div>
  `;
}

// Admin Functions
function renderAdminInventory() {
  const tbody = document.getElementById('adminInventoryBody');
  if (!tbody) return;
  const items = getGifts();
  tbody.innerHTML = '';
  items.forEach((item) => {
    tbody.innerHTML += `
      <tr>
        <td>${item.id}</td>
        <td><strong>${item.name}</strong></td>
        <td><span class="badge-tag">${item.cat}</span></td>
        <td>₹<input type="number" value="${item.price}" id="price-${item.id}" style="width:90px; padding:3px 6px;"></td>
        <td>
          <button class="btn btn-sm" onclick="adminModifyPrice(${item.id})">Update Price</button>
          <button class="btn btn-danger btn-sm" onclick="adminRemoveItem(${item.id})">Remove</button>
        </td>
      </tr>
    `;
  });
}

function adminAddItem(e) {
  e.preventDefault();
  const name = document.getElementById('addItemName').value.trim();
  const cat = document.getElementById('addItemCat').value;
  const subcat = document.getElementById('addItemSubcat').value.trim() || 'General';
  const price = parseInt(document.getElementById('addItemPrice').value);
  if (!name || isNaN(price)) return;
  const items = getGifts();
  const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
  items.push({ id: newId, name, cat, subcat, price, popularity: 80, inStock: true });
  saveGifts(items);
  alert(`Added new particular: "${name}" at ₹${price}`);
  e.target.reset();
  renderAdminInventory();
}

function adminModifyPrice(id) {
  const input = document.getElementById(`price-${id}`);
  const newPrice = parseInt(input.value);
  if (isNaN(newPrice) || newPrice <= 0) {
    alert("Please enter a valid price");
    return;
  }
  const items = getGifts();
  const item = items.find(i => i.id === id);
  if (item) {
    item.price = newPrice;
    saveGifts(items);
    alert(`Price of "${item.name}" updated to ₹${newPrice}`);
    renderAdminInventory();
  }
}

function adminRemoveItem(id) {
  if (!confirm("Are you sure you want to remove this item from the catalog?")) return;
  let items = getGifts();
  items = items.filter(i => i.id !== id);
  saveGifts(items);
  renderAdminInventory();
}

function renderAdminCustomers() {
  const tbody = document.getElementById('adminCustomersBody');
  if (!tbody) return;
  const customers = JSON.parse(localStorage.getItem('blossom_checkout_customers') || '[]');
  if (customers.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:#64748b;">No customer checkout logs yet.</td></tr>';
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
        <td><strong>₹${c.total}</strong> (${c.payment})</td>
        <td>${c.delDate} (${c.delSlot})</td>
      </tr>
    `;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  onCategoryChange();
  renderGiftCart();
  renderCheckoutSummary();
  renderAdminInventory();
  renderAdminCustomers();
});
