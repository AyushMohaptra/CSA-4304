
let bloodStock = {
  "O +ve": 24, "O -ve": 8, "A +ve": 18, "A -ve": 5,
  "B +ve": 21, "B -ve": 6, "AB +ve": 12, "AB -ve": 4
};

let donors = JSON.parse(localStorage.getItem('blood_donors')) || [
  { name: "Karthik Raja", group: "O +ve", city: "Chennai", date: "15-Aug-2026", phone: "9841029182" },
  { name: "Sneha Reddy", group: "B +ve", city: "Coimbatore", date: "02-Sep-2026", phone: "9443210984" },
  { name: "Vijay Anand", group: "AB -ve", city: "Madurai", date: "20-Jul-2026", phone: "9789012345" }
];

function renderStock() {
  const grid = document.getElementById('bloodStockGrid');
  if (!grid) return;
  grid.innerHTML = '';
  for (const [grp, units] of Object.entries(bloodStock)) {
    grid.innerHTML += `
      <div class="card" style="text-align:center;">
        <h2 style="color:var(--danger); font-size:1.8rem;">${grp}</h2>
        <p style="font-size:1.1rem; font-weight:700;">${units} Units Available</p>
      </div>
    `;
  }
}

function renderDonors() {
  const tbody = document.getElementById('donorTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  donors.forEach(d => {
    tbody.innerHTML += `
      <tr>
        <td><strong>${d.name}</strong></td>
        <td><span class="badge-tag" style="background:#fee2e2; color:#b91c1c;">${d.group}</span></td>
        <td>${d.city}</td>
        <td>${d.date}</td>
        <td>${d.phone}</td>
      </tr>
    `;
  });
}

function registerDonor(e) {
  e.preventDefault();
  const name = document.getElementById('dnName').value;
  const group = document.getElementById('dnGroup').value;
  const city = document.getElementById('dnCity').value;
  const phone = document.getElementById('dnPhone').value;
  donors.unshift({ name, group, city, date: "Today", phone });
  bloodStock[group] = (bloodStock[group] || 0) + 1;
  localStorage.setItem('blood_donors', JSON.stringify(donors));
  
  document.getElementById('donorAlert').innerHTML = `
    <div class="alert alert-success">
      Thank you <strong>${name}</strong>! You have been registered as an active donor for ${group}.
    </div>
  `;
}

function requestBlood(e) {
  e.preventDefault();
  const pat = document.getElementById('rqPatient').value;
  const hosp = document.getElementById('rqHosp').value;
  const grp = document.getElementById('rqGroup').value;
  const units = parseInt(document.getElementById('rqUnits').value);
  const reqId = "REQ-" + Math.floor(1000 + Math.random()*9000);

  document.getElementById('requestAlert').innerHTML = `
    <div class="alert alert-danger" style="margin-top:1rem;">
      <h3>Emergency Request Dispatched: ${reqId}</h3>
      <p>Patient: <strong>${pat}</strong> at ${hosp}</p>
      <p>Requirement: <strong>${units} units of ${grp}</strong></p>
      <p>SMS notifications sent to ${donors.filter(d=>d.group===grp).length} registered donors in the vicinity.</p>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  renderStock();
  renderDonors();
});
