
let challans = JSON.parse(localStorage.getItem('police_challans')) || [
  { id: "CHN-8401", veh: "TN 01 AB 1234", offence: "Signal Jumping", fine: 1000, loc: "Anna Salai Junction", status: "UNPAID" }
];

function searchChallan() {
  const reg = document.getElementById('chkReg').value.trim().toUpperCase();
  const list = challans.filter(c => c.veh.replace(/\s/g,'') === reg.replace(/\s/g,''));
  const res = document.getElementById('challanSearchResult');
  if (list.length === 0) {
    res.innerHTML = `<div class="alert alert-success">No pending violations found for vehicle <strong>${reg}</strong>!</div>`;
    return;
  }
  let html = `<h4>Pending Challans for ${reg}:</h4>`;
  list.forEach((c, idx) => {
    html += `
      <div class="card" style="margin-top:0.5rem;">
        <p>Challan No: <strong>${c.id}</strong></p>
        <p>Violation: ${c.offence} (${c.loc})</p>
        <p>Penalty Amount: <strong style="color:var(--danger);">₹${c.fine}</strong></p>
        <p>Status: <span class="badge-tag">${c.status}</span></p>
        ${c.status === 'UNPAID' ? `<button class="btn btn-sm" onclick="payChallan('${c.id}')">Pay Fine Online</button>` : ''}
      </div>
    `;
  });
  res.innerHTML = html;
}

function payChallan(id) {
  const ch = challans.find(c => c.id === id);
  if (ch) {
    ch.status = "PAID";
    localStorage.setItem('police_challans', JSON.stringify(challans));
    alert(`Payment of ₹${ch.fine} received. Challan ${id} cleared.`);
    searchChallan();
  }
}

function fileChallan(e) {
  e.preventDefault();
  const veh = document.getElementById('offVeh').value.trim().toUpperCase();
  const sel = document.getElementById('offType');
  const offence = sel.options[sel.selectedIndex].text.split('(')[0].trim();
  const fine = parseInt(sel.value);
  const loc = document.getElementById('offLoc').value;
  const id = "CHN-" + Math.floor(1000 + Math.random()*9000);

  challans.push({ id, veh, offence, fine, loc, status: "UNPAID" });
  localStorage.setItem('police_challans', JSON.stringify(challans));

  document.getElementById('policeAlert').innerHTML = `
    <div class="alert alert-success">
      <p>e-Challan <strong>${id}</strong> successfully generated for <strong>${veh}</strong>.</p>
      <p>Penalty: ₹${fine} | Offence: ${offence}</p>
    </div>
  `;
}
