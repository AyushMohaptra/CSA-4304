const defaultVehicles = [
  { id: 1, name: "Maruti Swift ZXi (Manual)", cat: "Hatchback", location: "Airport Hub", price: 1400, mileage: "22 kmpl" },
  { id: 2, name: "Hyundai Verna SX Turbo", cat: "Sedan", location: "City Center", price: 2200, mileage: "18 kmpl" },
  { id: 3, name: "Mahindra Thar 4x4 Hardtop", cat: "SUV", location: "Suburban Hub", price: 3200, mileage: "15 kmpl" },
  { id: 4, name: "Toyota Innova Crysta (7-Seater)", cat: "SUV", location: "Airport Hub", price: 3500, mileage: "14 kmpl" },
  { id: 5, name: "BMW 3 Series Gran Limousine", cat: "Luxury", location: "City Center", price: 7500, mileage: "16 kmpl" },
  { id: 6, name: "Tata Tiago EV (Electric)", cat: "Hatchback", location: "Metro Station", price: 1600, mileage: "250 km/charge" }
];

let rentals = JSON.parse(localStorage.getItem('rentride_bookings')) || [
  { id: "RR-701", name: "Siddharth V", veh: "Swift ZXi", days: 2, fare: 2800, status: "APPROVED" }
];

function filterAndSortFleet() {
  const grid = document.getElementById('fleetGrid');
  if (!grid) return;

  const searchInput = document.getElementById('fleetSearch');
  const catFilter = document.getElementById('fleetCat');
  const locFilter = document.getElementById('fleetLoc');
  const sortFilter = document.getElementById('fleetSort');

  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const selectedCat = catFilter ? catFilter.value : 'all';
  const selectedLoc = locFilter ? locFilter.value : 'all';
  const sortVal = sortFilter ? sortFilter.value : 'price_low';

  let list = [...defaultVehicles];

  if (query) {
    list = list.filter(v => 
      v.name.toLowerCase().includes(query) || 
      v.cat.toLowerCase().includes(query) || 
      v.location.toLowerCase().includes(query)
    );
  }

  if (selectedCat !== 'all') {
    list = list.filter(v => v.cat === selectedCat);
  }

  if (selectedLoc !== 'all') {
    list = list.filter(v => v.location === selectedLoc);
  }

  if (sortVal === 'price_low') {
    list.sort((a, b) => a.price - b.price);
  } else if (sortVal === 'price_high') {
    list.sort((a, b) => b.price - a.price);
  } else if (sortVal === 'name') {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  renderFleet(list);
}

function selectFleetPill(cat) {
  const catFilter = document.getElementById('fleetCat');
  if (catFilter) {
    catFilter.value = cat;
    filterAndSortFleet();
  }
}

function renderFleet(list) {
  const grid = document.getElementById('fleetGrid');
  if (!grid) return;

  if (list.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1; padding:2rem; text-align:center; color:#64748b;">No rental vehicles match your selection.</div>';
    return;
  }

  grid.innerHTML = '';
  list.forEach(v => {
    grid.innerHTML += `
      <div class="card">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="badge-tag">${v.cat}</span>
          <span style="font-size:0.8rem; color:#64748b;">📍 ${v.location}</span>
        </div>
        <h3 style="margin-top:0.5rem;">${v.name}</h3>
        <p style="font-size:0.85rem; color:#64748b;">Efficiency: <strong>${v.mileage}</strong></p>
        <p style="font-weight:700; color:var(--primary); font-size:1.2rem; margin:0.5rem 0;">₹${v.price} <span style="font-size:0.85rem; font-weight:normal; color:#64748b;">/ day</span></p>
        <a href="book.html?veh=${encodeURIComponent(v.name)}&rate=${v.price}" class="btn btn-sm" style="display:block; text-align:center;">Reserve Vehicle</a>
      </div>
    `;
  });
}

function calcRental() {
  const rate = parseFloat(document.getElementById('rentVeh').value);
  const days = parseInt(document.getElementById('rentDays').value) || 1;
  const total = rate * days;
  const fareEl = document.getElementById('fareTotal');
  if (fareEl) fareEl.innerText = "₹" + total.toLocaleString('en-IN');
}

function confirmBooking(e) {
  e.preventDefault();
  const name = document.getElementById('bkName').value;
  const vehSelect = document.getElementById('rentVeh');
  const vehName = vehSelect.options[vehSelect.selectedIndex].text.split('(')[0].trim();
  const rate = parseFloat(vehSelect.value);
  const days = parseInt(document.getElementById('rentDays').value) || 1;
  const fare = rate * days;
  const id = "RR-" + Math.floor(100 + Math.random()*900);

  rentals.push({ id, name, veh: vehName, days, fare, status: "PENDING APPROVAL" });
  localStorage.setItem('rentride_bookings', JSON.stringify(rentals));

  document.getElementById('bookAlert').innerHTML = `
    <div class="card" style="background:#ecfdf5; color:#065f46; margin-top:1rem;">
      <h3>Reservation Submitted!</h3>
      <p>Booking ID: <strong>${id}</strong></p>
      <p>Customer: ${name} | Vehicle: ${vehName} (${days} Days)</p>
      <p>Total Fare: <strong>₹${fare.toLocaleString('en-IN')}</strong></p>
      <p>Status: <span class="badge-tag" style="background:#fef3c7; color:#92400e;">PENDING APPROVAL</span></p>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  filterAndSortFleet();
});
