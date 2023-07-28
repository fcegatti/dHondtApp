// Obtenemos referencias a los elementos del formulario que necesitaremos
document.addEventListener('DOMContentLoaded', function() {
const electionTypeSelect = document.getElementById('electionType');
const chamberSelect = document.getElementById('chamber');
const acSelect = document.getElementById('autonomousCommunity');
const provinceSelect = document.getElementById('province');
const addPartyForm = document.forms['addParty'];
let parties = {};
let electionsData = null;
let provinceToAcMap = {};

// Obtenemos los datos de elections desde el servidor
fetch('/api/elections')
  .then(response => response.json())
  .then(data => {
    // Ahora los datos de las elecciones están disponibles en la variable electionsData.
    // Aquí se puede llamar a cualquier función que necesite usar estos datos.

    electionsData = data;
    fillAutonomousCommunities(electionsData);

    // Creo un objeto que mapea cada provincia a su comunidad autónoma para que handleAddPartySubmit pueda acceder a la lista de partidos desde el nivel de provincia
    
    for (let ac of electionsData.autonomousCommunities) {
      for (let province of ac.provinces) {
        provinceToAcMap[province.name] = ac.name;
      }
    }

    // Agregamos los event listeners a los elementos correspondientes
    electionTypeSelect.addEventListener('change', function(event) {
      if (event.target.value === 'autonomicas') {
        showModal('El cálculo de elecciones autonómicas no está disponible en esta versión');
        return;  
      }

      if (event.target.value === 'municipales') {
        showModal('El cálculo de elecciones municipales no está disponible en esta versión');
        return;  
      }
    
      handleElectionTypeChange(event);
      fillAutonomousCommunities(event);
    });
    chamberSelect.addEventListener('change', handleChamberChange);
    chamberSelect.addEventListener('change', fillAutonomousCommunities);
    acSelect.addEventListener('change', fillProvinces);
    acSelect.addEventListener('change', () => {
      console.log('Comunidad Autónoma seleccionada:', acSelect.value);
      updatePartyList();
    });
    provinceSelect.addEventListener('change', (event) => {
      console.log(`Provincia seleccionada: ${event.target.value}`);
    });
    addPartyForm.addEventListener('submit', handleAddPartySubmit);
  })
  .catch(error => console.error('Error:', error));


// Definimos las funciones que manejarán los eventos
function handleElectionTypeChange(event) {
  // imprimir el tipo de elección seleccionado en la consola
  const selectedElectionType = event.target.value;
  console.log('Tipo de elección seleccionado:', selectedElectionType);
}

function handleChamberChange(event) {
  // imprimir la cámara seleccionada en la consola
  const selectedChamber = event.target.value;
  console.log('Cámara seleccionada:', selectedChamber);
}

function fillAutonomousCommunities() {
  // obtén el selector de la comunidad autónoma
  const acSelect = document.querySelector('#autonomousCommunity');

  // limpia las opciones actuales
  acSelect.innerHTML = '<option value="">-Comunidad Autónoma-</option>';

  // agrega las comunidades autónomas de `elections.js`
  for (let ac of electionsData.autonomousCommunities) {
    const option = document.createElement('option');
    option.value = ac.name;
    option.text = ac.name;
    acSelect.add(option);
  }
}

function fillProvinces() {
  // obtén el selector de la provincia
  const provinceSelect = document.querySelector('#province');

  // limpia las opciones actuales
  provinceSelect.innerHTML = '<option value="">-Provincia-</option>';

  // obtén el nombre de la comunidad autónoma seleccionada
  const acName = document.querySelector('#autonomousCommunity').value;

  if (!acName) {
    return;
  }

  // busca la comunidad autónoma en `elections.js`
  const ac = electionsData.autonomousCommunities.find(ac => ac.name === acName);

  // agrega las provincias de la comunidad autónoma seleccionada
  for (let province of ac.provinces) {
    const option = document.createElement('option');
    option.value = province.name;
    option.text = province.name;
    provinceSelect.add(option);
  }
}

function handleAddPartySubmit(event) {
  event.preventDefault();  

  const acName = acSelect.value;

  if (!acName) {
    alert('Por favor, selecciona una Comunidad Autónoma antes de añadir partidos');
    return;
  }
  // Obtener los valores del formulario
  const partyName = event.target.elements['party'].value;
  const partyColor = event.target.elements['color'].value;
  const logoURL = event.target.elements['logo'].value;
  const newParty = {
    name: partyName,
    color: partyColor,
    logo: logoURL,
  };

  
  if (!parties[acName]) {
  parties[acName] = [];
  }
  parties[acName].push(newParty);
  updatePartyList();

}

function updatePartyList() {
  const acName = acSelect.value;

  // borro todos los elementos actuales de la lista de partidos
  const partyListItems = document.querySelector('#party-list-items');
  while (partyListItems.firstChild) {
    partyListItems.removeChild(partyListItems.firstChild);
  }

  // recreo la lista de partidos basada en los partidos de la Comunidad Autónoma seleccionada
  const acParties = parties[acName];
  if (acParties) {
    for (let party of acParties) {
      const partyListItem = document.createElement('li');
      partyListItem.textContent = party.name;
      partyListItems.appendChild(partyListItem);
    }
  }
}


});


/* Todavía se necesita verificar que tanto una elección como una cámara estén seleccionadas antes de llenar las comunidades autónomas, y verificar que se haya seleccionado una comunidad autónoma antes de llenar las provincias.

Todavía no se tiene en cuenta el llenado de los partidos y los votos. Eso se debe manejar en otro lugar y depende de la estructura exacta de los datos en elections.js.
*/