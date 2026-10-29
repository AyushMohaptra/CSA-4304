
let issuedPasses = JSON.parse(localStorage.getItem('smart_bus_passes')) || [];

function updatePassFee() {
  const fee = document.getElementById('bpCat').value;
  const disp = document.getElementById('feeDisplay');
  if (fee === "0") disp.innerHTML = "Pass Fee Payable: <strong>₹0.00 (Government Free Pass)</strong>";
  else disp.innerHTML = `Pass Fee Payable: <strong>₹${fee}.00 / Month</strong>`;
}

function applyPass(e) {
  e.preventDefault();
  const name = document.getElementById('bpName').value;
  const catText = document.getElementById('bpCat').options[document.getElementById('bpCat').selectedIndex].text;
  const inst = document.getElementById('bpInst').value;
  const from = document.getElementById('bpFrom').value;
  const to = document.getElementById('bpTo').value;
  const passId = "PASS-" + Math.floor(1000 + Math.random()*9000);

  const passObj = { id: passId, name, catText, inst, from, to, validTill: "31-Dec-2026", status: "VALID" };
  issuedPasses.push(passObj);
  localStorage.setItem('smart_bus_passes', JSON.stringify(issuedPasses));

  document.getElementById('passCardResult').innerHTML = `
    <div class="card" style="margin-top:1rem; border:2px dashed var(--primary); background:#f0fdf4;">
      <span class="badge-tag" style="background:#22c55e; color:white;">ACTIVE BUS PASS</span>
      <h3 style="margin-top:0.5rem;">${name}</h3>
      <p>Pass ID: <strong>${passId}</strong></p>
      <p>Category: ${catText}</p>
      <p>Route: <strong>${from} ⇄ ${to}</strong></p>
      <p>Institution: ${inst}</p>
      <p>Validity: Valid through 31-Dec-2026</p>
      <div style="background:white; display:inline-block; padding:10px; border:1px solid #ccc; margin-top:0.5rem;">
        <strong>[ QR CODE SIMULATION: ${passId} ]</strong>
      </div>
    </div>
  `;
}

function verifyPassId() {
  const pid = document.getElementById('verPassId').value.trim().toUpperCase();
  const p = issuedPasses.find(item => item.id === pid);
  const out = document.getElementById('verifyResult');
  if (!p) {
    out.innerHTML = `<div class="alert alert-danger">INVALID PASS ID! Record not found on conductor terminal.</div>`;
    return;
  }
  out.innerHTML = `
    <div class="alert alert-success">
      <h3>PASS VERIFIED: VALID</h3>
      <p>Passenger: <strong>${p.name}</strong></p>
      <p>Route: ${p.from} to ${p.to}</p>
      <p>Category: ${p.catText}</p>
      <p>Status: <strong style="color:var(--success);">AUTHORIZED COMMUTER</strong></p>
    </div>
  `;
}
