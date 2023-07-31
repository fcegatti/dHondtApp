document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded and parsed');

  const acSelect = document.querySelector('#autonomousCommunity');
  const provinceSelect = document.querySelector('#province');
  const seatsSectionTitle = document.querySelector('.seats-graph h2');

  function updateSeatsSectionTitle() {
    const acName = acSelect.value;
    const provinceName = provinceSelect.value;

    if (!acName) {
      console.error('acName is not defined');
      return;
    }

    const url = provinceName
      ? `/api/seats/${acName}/${provinceName}`
      : `/api/seats/${acName}`;

    fetch(`/api/seats/${acName}/${provinceName}`)
      .then(response => response.json())
      .then(data => {seatsSectionTitle.textContent = `Escaños (${data.totalSeats})`;
      })
      .catch(error => console.error('Error', error))
  }

  acSelect.addEventListener('change', updateSeatsSectionTitle);
  provinceSelect.addEventListener('change', updateSeatsSectionTitle);

  updateSeatsSectionTitle();

});