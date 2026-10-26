const defaultProperties = [
  { id: 1, title: "Emerald Bay Luxury Sea-Facing Villa", cat: "Villas", loc: "ECR, Chennai", price: 27500000, area: "3,800 sq.ft", emi: "₹1,85,000/mo" },
  { id: 2, title: "Skyline Green Heights 3BHK Apartment", cat: "Apartments", loc: "OMR IT Corridor", price: 8500000, area: "1,650 sq.ft", emi: "₹58,000/mo" },
  { id: 3, title: "TechPark Grade-A Commercial Office", cat: "Commercial", loc: "Guindy Cyber Hub", price: 42000000, area: "5,200 sq.ft", emi: "₹2,90,000/mo" },
  { id: 4, title: "Palm Meadows CMDA Approved Plot", cat: "Plots", loc: "Tambaram West", price: 3800000, area: "1,800 sq.ft", emi: "₹26,000/mo" },
  { id: 5, title: "The Grandeur 4BHK Penthouse", cat: "Apartments", loc: "Nungambakkam", price: 35000000, area: "4,100 sq.ft", emi: "₹2,40,000/mo" },
  { id: 6, title: "Serene Crest Gated Community Villa", cat: "Villas", loc: "Perungudi OMR", price: 19500000, area: "2,900 sq.ft", emi: "₹1,32,000/mo" }
];

function filterAndSortProperties() {
  const grid = document.getElementById('propGrid');
  if (!grid) return;

  const searchInput = document.getElementById('propSearch');
  const catFilter = document.getElementById('propCategory');
  const sortFilter = document.getElementById('propSort');

  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const selectedCat = catFilter ? catFilter.value : 'all';
  const sortVal = sortFilter ? sortFilter.value : 'price_low';

  let list = [...defaultProperties];

  if (query) {
    list = list.filter(p => 
      p.title.toLowerCase().includes(query) || 
      p.loc.toLowerCase().includes(query) || 
      p.cat.toLowerCase().includes(query)
    );
  }

  if (selectedCat !== 'all') {
    list = list.filter(p => p.cat === selectedCat);
  }

  if (sortVal === 'price_low') {
    list.sort((a, b) => a.price - b.price);
  } else if (sortVal === 'price_high') {
    list.sort((a, b) => b.price - a.price);
  } else if (sortVal === 'title') {
    list.sort((a, b) => a.title.localeCompare(b.title));
  }

  renderProperties(list);
}

function selectPropPill(cat) {
  const catFilter = document.getElementById('propCategory');
  if (catFilter) {
    catFilter.value = cat;
    filterAndSortProperties();
  }
}

function renderProperties(list) {
  const grid = document.getElementById('propGrid');
  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1; padding:2rem; text-align:center; color:#64748b;">No real estate properties match your criteria.</div>';
    return;
  }

  grid.innerHTML = '';
  list.forEach(p => {
    grid.innerHTML += `
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="badge-tag">${p.cat}</span>
          <span style="font-size:0.8rem; color:#64748b;">📍 ${p.loc}</span>
        </div>
        <h3 style="margin-top:0.5rem;">${p.title}</h3>
        <p style="font-size:0.85rem; color:#64748b;">Built-up: <strong>${p.area}</strong> | Est. EMI: ${p.emi}</p>
        <p style="font-weight:700; color:var(--primary); font-size:1.25rem; margin:0.5rem 0;">₹${(p.price / 100000).toFixed(1)} Lakhs</p>
        <a href="visit.html?prop=${encodeURIComponent(p.title)}" class="btn btn-sm" style="display:block; text-align:center;">Schedule Site Visit</a>
      </div>
    `;
  });
}

function calcEMI() {
  const p = parseFloat(document.getElementById('loanP').value);
  const rYear = parseFloat(document.getElementById('loanR').value);
  const nYear = parseFloat(document.getElementById('loanN').value);

  const r = (rYear / 12) / 100;
  const n = nYear * 12;

  const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const total = emi * n;
  const interest = total - p;

  document.getElementById('emiResult').innerHTML = `
    <div style="padding:1rem; background:#f0fdf4; border-radius:8px; border:1px solid #bbf7d0; margin-top:1rem;">
      <p>Monthly EMI Payable: <strong style="font-size:1.3rem; color:#15803d;">₹${Math.round(emi).toLocaleString('en-IN')}</strong></p>
      <p>Total Interest Payable: ₹${Math.round(interest).toLocaleString('en-IN')}</p>
      <p>Total Payment (Principal + Interest): ₹${Math.round(total).toLocaleString('en-IN')}</p>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  filterAndSortProperties();
});
