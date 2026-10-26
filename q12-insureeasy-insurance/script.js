
function calcPremium() {
  const cat = document.getElementById('insCat').value;
  const age = parseInt(document.getElementById('insAge').value) || 30;
  const sum = parseFloat(document.getElementById('insSum').value);
  let baseRate = 0.008;
  if (cat === 'health') baseRate = age > 40 ? 0.015 : 0.009;
  else if (cat === 'auto') baseRate = 0.025;
  else if (cat === 'life') baseRate = age > 40 ? 0.005 : 0.002;
  
  const annualPrem = Math.round(sum * baseRate);
  document.getElementById('premiumResult').innerHTML = `
    <div class="alert alert-success">
      <h3>Estimated Premium: ₹${annualPrem.toLocaleString('en-IN')} / year</h3>
      <p>Quarterly: ₹${Math.round(annualPrem/4).toLocaleString('en-IN')} | Monthly: ₹${Math.round(annualPrem/12).toLocaleString('en-IN')}</p>
      <button class="btn btn-sm" style="margin-top:0.5rem;" onclick="alert('Proceeding to instant policy issuance form!')">Buy Policy Now</button>
    </div>
  `;
}

function submitClaim(e) {
  e.preventDefault();
  const pol = document.getElementById('clmPolicy').value;
  const name = document.getElementById('clmName').value;
  const amt = document.getElementById('clmAmt').value;
  const token = "CLM-" + Math.floor(100000 + Math.random() * 900000);
  document.getElementById('claimAlert').innerHTML = `
    <div class="alert alert-success">
      <p>Claim Registered Successfully!</p>
      <p>Claim Reference: <strong>${token}</strong></p>
      <p>Policyholder: ${name} (Policy: ${pol})</p>
      <p>Estimated Amount: ₹${amt}</p>
      <p>Our surveyor / TPA will contact you within 24 hours.</p>
    </div>
  `;
}

function renderAdminClaims() {
  const tbody = document.getElementById('adminClaimsBody');
  if (!tbody) return;
  const claims = JSON.parse(localStorage.getItem('insureeasy_claims') || '[]');
  if (claims.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; color:#64748b;">No claims filed yet.</td></tr>';
    return;
  }
  tbody.innerHTML = '';
  claims.forEach((c, idx) => {
    tbody.innerHTML += `
      <tr>
        <td><strong>${c.claimId}</strong></td>
        <td>${c.policyNo}</td>
        <td><span class="badge-tag">${c.type}</span></td>
        <td>₹${c.amount}</td>
        <td>${c.desc}</td>
        <td><strong style="color:${c.status === 'Approved' ? '#059669' : '#dc2626'}">${c.status}</strong></td>
        <td>
          <button class="btn btn-sm" onclick="adminSetClaimStatus(${idx}, 'Approved')">Approve</button>
          <button class="btn btn-danger btn-sm" onclick="adminSetClaimStatus(${idx}, 'Rejected')">Reject</button>
        </td>
      </tr>
    `;
  });
}

function adminSetClaimStatus(idx, status) {
  const claims = JSON.parse(localStorage.getItem('insureeasy_claims') || '[]');
  claims[idx].status = status;
  localStorage.setItem('insureeasy_claims', JSON.stringify(claims));
  renderAdminClaims();
  alert(`Claim ${claims[idx].claimId} marked as ${status}`);
}

function adminAddPolicy(e) {
  e.preventDefault();
  const name = document.getElementById('polName').value.trim();
  const cat = document.getElementById('polCat').value;
  const rate = document.getElementById('polRate').value;
  document.getElementById('polAlert').innerHTML = `
    <div class="card" style="margin-top:1rem; background:#ecfdf5; color:#065f46;">
      Policy Plan <strong>${name}</strong> (${cat}) configured at base rate ${rate}.
    </div>
  `;
  e.target.reset();
}

// Modify claim submission to persist to localStorage
const origFileClaim = window.fileClaim;
window.fileClaim = function(e) {
  if (e) e.preventDefault();
  const policyNo = document.getElementById('clmPolicy').value.trim();
  const type = document.getElementById('clmType').value;
  const amount = document.getElementById('clmAmt').value;
  const desc = document.getElementById('clmDesc').value;
  const claimId = 'CLM-' + Math.floor(10000 + Math.random() * 90000);

  const claims = JSON.parse(localStorage.getItem('insureeasy_claims') || '[]');
  claims.unshift({ claimId, policyNo, type, amount, desc, status: 'Under Review', date: new Date().toLocaleDateString() });
  localStorage.setItem('insureeasy_claims', JSON.stringify(claims));

  const alertBox = document.getElementById('claimResult');
  if (alertBox) {
    alertBox.innerHTML = `
      <div class="card" style="margin-top:1rem; background:#ecfdf5; color:#065f46;">
        <h3>Claim Filed Successfully!</h3>
        <p>Tracking Claim Reference: <strong>${claimId}</strong></p>
        <p>Policy: ${policyNo} | Amount: ₹${amount}</p>
        <p>Our claims assessment team will evaluate your claim within 48 hours.</p>
      </div>
    `;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  renderAdminClaims();
});
