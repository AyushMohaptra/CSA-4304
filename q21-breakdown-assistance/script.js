
function requestRescue(e) {
  e.preventDefault();
  const name = document.getElementById('brkName').value;
  const veh = document.getElementById('brkVeh').value;
  const issue = document.getElementById('brkIssue').value;
  const loc = document.getElementById('brkLoc').value;
  const ref = "SOS-" + Math.floor(1000 + Math.random()*9000);

  const statusHtml = `
    <div class="alert alert-success">
      <h3>Rescue Unit Dispatched: ${ref}</h3>
      <p>Driver: <strong>${name}</strong> (${veh})</p>
      <p>Issue: <span class="badge-tag">${issue}</span></p>
      <p>Location: ${loc}</p>
      <p>Assigned Mechanic: <strong>Speedy Wheels (Ramesh K.)</strong></p>
      <p>Estimated Arrival Time (ETA): <strong>14 minutes</strong></p>
    </div>
  `;
  document.getElementById('rescueAlert').innerHTML = statusHtml;
  localStorage.setItem('active_rescue', statusHtml);
}

document.addEventListener('DOMContentLoaded', () => {
  const statBox = document.getElementById('activeRescueStatus');
  if (statBox) {
    const saved = localStorage.getItem('active_rescue');
    if (saved) statBox.innerHTML = saved;
  }
});
