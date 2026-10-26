const defaultAgri = [
  { id: 1, name: "Hybrid Paddy Seed (IR-64)", cat: "Seeds", price: 650, rating: 4.8 },
  { id: 2, name: "Bio-NPK Organic Fertilizer (50kg)", cat: "Fertilizers", price: 1100, rating: 4.9 },
  { id: 3, name: "Neem Power Bio-Insecticide (5L)", cat: "Pesticides", price: 850, rating: 4.6 },
  { id: 4, name: "Battery Powered Knapsack Sprayer", cat: "Equipment", price: 2800, rating: 4.7 },
  { id: 5, name: "Hybrid Maize Seeds (High Yield)", cat: "Seeds", price: 480, rating: 4.5 },
  { id: 6, name: "Granular Micronutrient Mix (25kg)", cat: "Fertilizers", price: 920, rating: 4.6 },
  { id: 7, name: "Solar Insect Light Trap", cat: "Equipment", price: 1950, rating: 4.9 },
  { id: 8, name: "Copper Oxychloride Fungicide (1kg)", cat: "Pesticides", price: 380, rating: 4.4 }
];

let agriCart = JSON.parse(localStorage.getItem('agri_cart')) || [];

function filterAndSortAgri() {
  const grid = document.getElementById('agriGrid');
  if (!grid) return;

  const searchInput = document.getElementById('agriSearch');
  const catFilter = document.getElementById('agriCategory');
  const sortFilter = document.getElementById('agriSort');

  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const selectedCat = catFilter ? catFilter.value : 'all';
  const sortVal = sortFilter ? sortFilter.value : 'rating';

  let list = [...defaultAgri];

  if (query) {
    list = list.filter(i => 
      i.name.toLowerCase().includes(query) || 
      i.cat.toLowerCase().includes(query)
    );
  }

  if (selectedCat !== 'all') {
    list = list.filter(i => i.cat === selectedCat);
  }

  if (sortVal === 'price_low') {
    list.sort((a, b) => a.price - b.price);
  } else if (sortVal === 'price_high') {
    list.sort((a, b) => b.price - a.price);
  } else if (sortVal === 'name') {
    list.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    list.sort((a, b) => b.rating - a.rating);
  }

  renderAgri(list);
}

function selectAgriPill(cat) {
  const catFilter = document.getElementById('agriCategory');
  if (catFilter) {
    catFilter.value = cat;
    filterAndSortAgri();
  }
}

function renderAgri(list) {
  const grid = document.getElementById('agriGrid');
  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1; padding:2rem; text-align:center; color:#64748b;">No agricultural supplies found.</div>';
    return;
  }

  grid.innerHTML = '';
  list.forEach(item => {
    grid.innerHTML += `
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="badge-tag">${item.cat}</span>
          <span style="font-size:0.8rem; color:#059669; font-weight:600;">★ Rating: ${item.rating} / 5</span>
        </div>
        <h3 style="margin-top:0.5rem;">${item.name}</h3>
        <p style="font-weight:700; color:var(--primary); font-size:1.2rem; margin:0.5rem 0;">₹${item.price.toLocaleString('en-IN')}</p>
        <button class="btn btn-sm" style="width:100%;" onclick="addAgriToCart(${item.id})">Add to Farm Cart</button>
      </div>
    `;
  });
}

function addAgriToCart(id) {
  const item = defaultAgri.find(i => i.id === id);
  agriCart.push({ id: item.id, name: item.name, price: item.price });
  localStorage.setItem('agri_cart', JSON.stringify(agriCart));
  alert(`${item.name} added to your farm cart!`);
}

function renderAgriCart() {
  const tbody = document.getElementById('agriCartBody');
  const total = document.getElementById('agriTotal');
  if (!tbody) return;
  tbody.innerHTML = '';
  let sum = 0;
  agriCart.forEach((item, idx) => {
    sum += item.price;
    tbody.innerHTML += `
      <tr>
        <td><strong>${item.name}</strong></td>
        <td>₹${item.price}</td>
        <td>1</td>
        <td>₹${item.price}</td>
        <td><button class="btn btn-danger btn-sm" onclick="removeAgri(${idx})">Remove</button></td>
      </tr>
    `;
  });
  if (total) total.innerText = "₹" + sum.toLocaleString('en-IN');
}

function removeAgri(idx) {
  agriCart.splice(idx, 1);
  localStorage.setItem('agri_cart', JSON.stringify(agriCart));
  renderAgriCart();
}

document.addEventListener('DOMContentLoaded', () => {
  filterAndSortAgri();
  renderAgriCart();
});
