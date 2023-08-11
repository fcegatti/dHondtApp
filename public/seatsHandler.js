document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded and parsed');
  
  const electionTypeSelect = document.querySelector('#electionType');
  const chamberSelect = document.querySelector('#chamber');
  const acSelect = document.querySelector('#autonomousCommunity');
  const provinceSelect = document.querySelector('#province');
  const seatsSectionTitle = document.querySelector('.seats-graph h2');

  let unassignedSeats = 0;

  function updateSeatsInfo() {
    const electionType = electionTypeSelect.value;
    const chamber = chamberSelect.value;
    const acName = acSelect.value;
    let provinceName = provinceSelect.value;

    if (!acName) {
      if (electionType === 'generales' && chamber === 'congreso') {
        seatsSectionTitle.textContent = `ESCAÑOS (350)`;
      } else {
        seatsSectionTitle.textContent = `Escaños (350)`;
      }
      return;
    }
    

    const url = provinceName
      ? `/api/seats/${acName}/${provinceName}`
      : `/api/seats/${acName}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        seatsSectionTitle.textContent = `ESCAÑOS (${data.totalSeats})`;

        unassignedSeats = data.totalSeats;
      })
      .catch(error => console.error('Error', error))
  }

  function updateSeatsChart(ac, province) {
    const endpoint = province ? `/api/seats/${ac}/${province}` : `/api/seats/${ac}`;
    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        const unassignedSeatsData = {
          party: 'No Asignado',
          seatsPercentage: (data.unassignedSeats / data.totalSeats) * 100,
          color: 'gray'
        };
        drawSeatsArc([unassignedSeatsData]);
        seatsSectionTitle.textContent = `ESCAÑOS (${data.totalSeats})`;
      })
      .catch(error => console.error('Error', error));
  }

  electionTypeSelect.addEventListener('change', updateSeatsInfo);
  chamberSelect.addEventListener('change', updateSeatsInfo);
  acSelect.addEventListener('change', function () {
    provinceSelect.selectedIndex = 0; // Reseteo la selección de la provincia cuando se selecciona una comunidad autónoma para que no devuelva undefined al volver a la CCAA
    updateSeatsInfo();
  });
  provinceSelect.addEventListener('change', updateSeatsInfo);

  updateSeatsInfo();

});


  