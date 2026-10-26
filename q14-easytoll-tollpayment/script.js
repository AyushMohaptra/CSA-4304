
let wallet = parseFloat(localStorage.getItem('easytoll_bal')) || 850.0;
let tollHistory = JSON.parse(localStorage.getItem('easytoll_hist')) || [
  { plaza: "Paranur Toll Gate", veh: "Car (TN 09 AB 4521)", amt: 85, status: "SUCCESS", time: "Today 08:32 AM" },
  { plaza: "Athur Toll Plaza", veh: "Car (TN 09 AB 4521)", amt: 85, status: "SUCCESS", time: "Yesterday 05:40 PM" }
];

function updateWalletDisplay() {
  const el = document.getElementById('walletBal');
  if (el) el.innerText = "₹" + wallet.toFixed(2);
}

function rechargeWallet() {
  const amt = parseFloat(document.getElementById('rechAmt').value);
  if (!amt || amt <= 0) { alert('Enter valid amount'); return; }
  wallet += amt;
  localStorage.setItem('easytoll_bal', wallet);
  updateWalletDisplay();
  alert(`Recharge of ₹${amt} successful!`);
}

function processTollPayment() {
  const base = parseFloat(document.getElementById('tollVeh').value);
  const mult = parseFloat(document.getElementById('tollTrip').value);
  const plaza = document.getElementById('tollPlaza').value;
  const total = Math.round(base * mult);

  if (wallet < total) {
    alert('Insufficient balance in FASTag wallet. Please recharge!');
    return;
  }
  wallet -= total;
  localStorage.setItem('easytoll_bal', wallet);
  const recId = "TOLL-" + Math.floor(100000 + Math.random()*900000);
  tollHistory.unshift({ plaza, veh: "TN 09 AB 4521", amt: total, status: "PAID", time: "Just now" });
  localStorage.setItem('easytoll_hist', JSON.stringify(tollHistory));
  
  document.getElementById('tollReceipt').innerHTML = `
    <div class="alert alert-success">
      <h3>Electronic Toll Receipt: ${recId}</h3>
      <p>Plaza: ${plaza}</p>
      <p>Amount Deducted: <strong>₹${total}</strong></p>
      <p>Remaining FASTag Balance: ₹${wallet.toFixed(2)}</p>
      <p style="color:var(--success); font-weight:700;">GREEN LIGHT - BOOM BARRIER OPENED</p>
    </div>
  `;
}

function renderHistory() {
  const tbody = document.getElementById('tollHistBody');
  if (!tbody) return;
  tbody.innerHTML = '';
  tollHistory.forEach(h => {
    tbody.innerHTML += `
      <tr>
        <td>${h.plaza}</td>
        <td>${h.veh}</td>
        <td>₹${h.amt}</td>
        <td><span class="badge-tag" style="background:#dcfce7; color:#15803d;">${h.status}</span></td>
        <td>${h.time}</td>
      </tr>
    `;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateWalletDisplay();
  renderHistory();
});
