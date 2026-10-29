
const artworks = [
  { id: 1, title: "Echoes of Twilight", medium: "Oil", year: "2025", desc: "48x36 in. Deep cobalt blue and golden ochre." },
  { id: 2, title: "Whispering Rain", medium: "Watercolor", year: "2026", desc: "Delicate washes on 300gsm cold-press paper." },
  { id: 3, title: "Symphony of the Dunes", medium: "Oil", year: "2024", desc: "Rich textured impasto depicting desert winds." },
  { id: 4, title: "Morning Mist on Lake Como", medium: "Watercolor", year: "2026", desc: "Reflective water study in pastel tones." }
];

function renderArt(list) {
  const grid = document.getElementById('artGrid');
  if (!grid) return;
  grid.innerHTML = '';
  list.forEach(a => {
    grid.innerHTML += `
      <div class="card">
        <span class="badge-tag">${a.medium.toUpperCase()} • ${a.year}</span>
        <h3 style="margin-top:0.5rem;">${a.title}</h3>
        <p>${a.desc}</p>
        <button class="btn btn-sm" onclick="alert('Inquiry for "${a.title}" sent to studio representative.')">Inquire Artwork</button>
      </div>
    `;
  });
}

function filterArt(med) {
  if (med === 'all') renderArt(artworks);
  else renderArt(artworks.filter(a => a.medium === med));
}

document.addEventListener('DOMContentLoaded', () => {
  renderArt(artworks);
});
