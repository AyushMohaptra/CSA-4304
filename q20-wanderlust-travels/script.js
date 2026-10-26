
function bookTour(e) {
  e.preventDefault();
  const name = document.getElementById('trvName').value;
  const destSelect = document.getElementById('trvDest');
  const destName = destSelect.options[destSelect.selectedIndex].text.split('(')[0].trim();
  const price = parseFloat(destSelect.value);
  const count = parseInt(document.getElementById('trvCount').value) || 1;
  const total = price * count;
  const pnr = "WND-" + Math.floor(100000 + Math.random()*900000);

  document.getElementById('tourAlert').innerHTML = `
    <div class="alert alert-success">
      <h3>Holiday Confirmed: ${pnr}</h3>
      <p>Lead Traveler: <strong>${name}</strong></p>
      <p>Package: ${destName} for ${count} Travelers</p>
      <p>Total Cost: <strong>₹${total.toLocaleString('en-IN')}</strong></p>
      <p>Your itinerary voucher and hotel vouchers have been generated.</p>
    </div>
  `;
}

function calcCustomTrip() {
  const daily = parseFloat(document.getElementById('cDest').value);
  const days = parseInt(document.getElementById('cDays').value) || 1;
  const pax = parseInt(document.getElementById('cTravelers').value) || 1;
  const estimate = daily * days * pax;
  document.getElementById('customResult').innerHTML = `
    <div class="alert alert-success">
      <h3>Estimated Budget: ₹${estimate.toLocaleString('en-IN')}</h3>
      <p>Includes accommodation, daily breakfast, and internal city transfers for ${pax} people for ${days} days.</p>
    </div>
  `;
}

const origBookTour = window.bookTour;
window.bookTour = function(e) {
  e.preventDefault();
  const name = document.getElementById('trvName').value.trim();
  const destSelect = document.getElementById('trvDest');
  const destName = destSelect.options[destSelect.selectedIndex].text.split('(')[0].trim();
  const price = parseFloat(destSelect.value);
  const count = parseInt(document.getElementById('trvCount').value) || 1;
  const total = price * count;
  const ref = "WND-" + Math.floor(1000 + Math.random()*9000);

  const list = JSON.parse(localStorage.getItem('wanderlust_bookings') || '[]');
  list.unshift({ ref, name, dest: destName, count, total, date: new Date().toLocaleDateString() });
  localStorage.setItem('wanderlust_bookings', JSON.stringify(list));

  document.getElementById('bookingResult').innerHTML = `
    <div class="alert alert-success">
      <p>Booking Confirmed!</p>
      <p>Booking Ref: <strong>${ref}</strong></p>
      <p>Lead Traveler: ${name}</p>
      <p>Package: ${destName} (${count} Persons)</p>
      <p>Total Estimated Cost: <strong>₹${total.toLocaleString('en-IN')}</strong></p>
      <p>Itinerary vouchers emailed to traveler.</p>
    </div>
  `;
};
