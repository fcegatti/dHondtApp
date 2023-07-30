document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded and parsed');

  const acSelect = document.querySelector('#autonomousCommunity');
  const provinceSelect = document.querySelector('#province');
  const seatsSectionTitle = document.querySelector('.seats-graph h2');

  function updateSeatsSectionTitle() {
    const acName = acSelect.value;
    const provinceName = provinceSelect.value;

    if (provinceName) {
      const totalSeats = "calculateSeats(acName, provinceName)";
      seatsSectionTitle.textContent = `Escaños (${totalSeats})`;
    } else if (acName) {
      const totalSeats = "calcualteSeats(acName)";
      seatsSectionTitle.textContent = `Escaños (${totalSeats})`;
    } else {
      seatsSectionTitle.textContent = 'Escaños';
    }
  }

  acSelect.addEventListener('change', updateSeatsSectionTitle);
  provinceSelect.addEventListener('change', updateSeatsSectionTitle);

  updateSeatsSectionTitle();

});