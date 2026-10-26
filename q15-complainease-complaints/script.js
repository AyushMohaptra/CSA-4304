
let complaints = JSON.parse(localStorage.getItem('complainease_data')) || [
  { id: "GRV-1001", name: "Kavitha S", cat: "Electricity & Streetlights", loc: "Anna Nagar Main Rd", desc: "Phase cut issue", status: "In Progress" },
  { id: "GRV-1002", name: "Murugan M", cat: "Roads & Potholes", loc: "Railway Feeder Rd", desc: "Deep pothole near junction", status: "Resolved" }
];

function lodgeComplaint(e) {
  e.preventDefault();
  const name = document.getElementById('cmpName').value;
  const cat = document.getElementById('cmpCat').value;
  const loc = document.getElementById('cmpLoc').value;
  const desc = document.getElementById('cmpDesc').value;
  const id = "GRV-" + Math.floor(1000 + Math.random()*9000);
  complaints.push({ id, name, cat, loc, desc, status: "Submitted" });
  localStorage.setItem('complainease_data', JSON.stringify(complaints));
  
  document.getElementById('lodgeResult').innerHTML = `
    <div class="alert alert-success">
      <p>Complaint successfully lodged!</p>
      <p>Tracking Ticket ID: <strong>${id}</strong></p>
      <p>Status: <span class="badge-tag">Submitted</span></p>
      <p>Save this Ticket ID to track the action taken.</p>
    </div>
  `;
}

function checkStatus() {
  const tid = document.getElementById('trackId').value.trim();
  const c = complaints.find(item => item.id.toLowerCase() === tid.toLowerCase());
  const out = document.getElementById('trackResult');
  if (!c) {
    out.innerHTML = `<div class="alert alert-warning">No complaint record found for Ticket: ${tid}</div>`;
    return;
  }
  out.innerHTML = `
    <div class="alert alert-success">
      <h3>Ticket: ${c.id}</h3>
      <p>Category: <strong>${c.cat}</strong></p>
      <p>Location: ${c.loc}</p>
      <p>Description: ${c.desc}</p>
      <p>Current Status: <strong style="color:var(--primary); font-size:1.1rem;">${c.status}</strong></p>
    </div>
  `;
}

function renderAdmin() {
  const tbody = document.getElementById('complaintAdminTable');
  if (!tbody) return;
  tbody.innerHTML = '';
  complaints.forEach((c, idx) => {
    tbody.innerHTML += `
      <tr>
        <td><strong>${c.id}</strong></td>
        <td>${c.name}</td>
        <td>${c.cat}</td>
        <td>${c.loc}</td>
        <td><span class="badge-tag">${c.status}</span></td>
        <td>
          <select onchange="updateStatus(${idx}, this.value)">
            <option ${c.status==='Submitted'?'selected':''}>Submitted</option>
            <option ${c.status==='In Progress'?'selected':''}>In Progress</option>
            <option ${c.status==='Resolved'?'selected':''}>Resolved</option>
          </select>
        </td>
      </tr>
    `;
  });
}

function updateStatus(idx, val) {
  complaints[idx].status = val;
  localStorage.setItem('complainease_data', JSON.stringify(complaints));
  alert(`Ticket ${complaints[idx].id} marked as ${val}`);
}

document.addEventListener('DOMContentLoaded', () => {
  renderAdmin();
});
