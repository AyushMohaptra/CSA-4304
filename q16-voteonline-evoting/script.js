
let votes = JSON.parse(localStorage.getItem('voteonline_tally')) || {
  "Arun Kumar (Progressive Party)": 142,
  "Priya Sharma (Youth Alliance)": 189,
  "David Miller (Independent)": 64
};

let votedUsers = JSON.parse(localStorage.getItem('voteonline_voted')) || ["VOT-0001", "VOT-0002"];

function submitBallot() {
  const vid = document.getElementById('voterIdInput').value.trim();
  const chosen = document.querySelector('input[name="candidate"]:checked');
  if (!vid) { alert('Please enter your Voter ID'); return; }
  if (!chosen) { alert('Please select a candidate'); return; }
  
  if (votedUsers.includes(vid.toUpperCase())) {
    document.getElementById('voteAlert').innerHTML = `
      <div class="alert alert-warning">
        <strong>Vote Denied:</strong> Voter ID ${vid} has already cast their ballot!
      </div>
    `;
    return;
  }

  const cand = chosen.value;
  votes[cand] = (votes[cand] || 0) + 1;
  votedUsers.push(vid.toUpperCase());
  localStorage.setItem('voteonline_tally', JSON.stringify(votes));
  localStorage.setItem('voteonline_voted', JSON.stringify(votedUsers));

  document.getElementById('voteAlert').innerHTML = `
    <div class="alert alert-success">
      <h3>Ballot Successfully Recorded!</h3>
      <p>Voter ID: <strong>${vid.toUpperCase()}</strong></p>
      <p>Candidate: ${cand}</p>
      <p><a href="results.html">Click here to view live election tally →</a></p>
    </div>
  `;
}

function renderResults() {
  const container = document.getElementById('tallyDisplay');
  if (!container) return;
  const total = Object.values(votes).reduce((a,b)=>a+b, 0);
  let html = `<p>Total Votes Cast: <strong>${total}</strong></p><br>`;
  for (const [cand, count] of Object.entries(votes)) {
    const pct = total > 0 ? ((count/total)*100).toFixed(1) : 0;
    html += `
      <div style="margin-bottom:1rem;">
        <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem;">
          <span><strong>${cand}</strong></span>
          <span>${count} votes (${pct}%)</span>
        </div>
        <div style="background:#e2e8f0; border-radius:999px; height:12px; overflow:hidden;">
          <div style="background:var(--primary); width:${pct}%; height:100%;"></div>
        </div>
      </div>
    `;
  }
  container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  renderResults();
});
