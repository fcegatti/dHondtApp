// Obtenemos referencias a los elementos del formulario que necesitaremos
document.addEventListener('DOMContentLoaded', function() {
  
const electionTypeSelect = document.getElementById('electionType');
const chamberSelect = document.getElementById('chamber');
const acSelect = document.getElementById('autonomousCommunity');
const provinceSelect = document.getElementById('province');
const addPartyForm = document.forms['addParty'];
const partyEntryForm = document.querySelector('.party-list');
const partyList = document.querySelector('#party-list');
const formContainer = document.querySelector('.voting-form');
let parties = {};
let electionsData = null;
let provinceToAcMap = {};
let votes = {};

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
        showModal('El cálculo de elecciones autonómicas no está disponible en esta versión', function() { return; });
        return;  
      }

      if (event.target.value === 'municipales') {
        showModal('El cálculo de elecciones municipales no está disponible en esta versión', function() { return; });
        return;  
      }

      if (event.target.value === 'europeas') {
        showModal('El cálculo de elecciones europeas no está disponible en esta versión', function() { return; });
        return;  
      }
    
      handleElectionTypeChange(event);
      fillAutonomousCommunities(event);
    });
    chamberSelect.addEventListener('change', function(event) {
      if (event.target.value === 'senado') {
        showModal('El cálculo de elecciones al senado no está disponible en esta versión', function() { return; });
        return;  
      }

      handleChamberChange(event);
      fillAutonomousCommunities(event);
    });
    acSelect.addEventListener('change', fillProvinces);
    acSelect.addEventListener('change', () => {
      console.log('Comunidad Autónoma seleccionada:', acSelect.value);
      updatePartyList();
      partyEntryForm.classList.remove('hide');
      partyList.classList.remove('hide');
      formContainer.classList.add('hide');
      formContainer.style.display = 'none';
    });
    provinceSelect.addEventListener('change', (event) => {
      console.log(`Provincia seleccionada: ${event.target.value}`);
      if (event.target.value) {
      generateVotingForm();
      }
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

function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;  
  }
}

function handleAddPartySubmit(event) {
  event.preventDefault();  

  const acName = acSelect.value;

  if (!acName) {
    showModal('Debes seleccionar una Comunidad Autónoma para poder añadir partidos', function() { return; });
    return;
  }
  // Obtener los valores del formulario
  const partyName = event.target.elements['party'].value;
  const partyColor = event.target.elements['color'].value;
  const logoURL = event.target.elements['logo'].value;

  if (!partyName) {
    showModal('Debes ingresar un nombre válido para el partido', function() { return; });
    return;
  }

  if (partyName.length > 32) {
    showModal('El nombre del partido no puede exceder los 32 caracteres', function() { return; });
    return;
  }

  if (!/^[A-Za-z0-9\u00C0-\u024F\-\s]+$/g.test(partyName)) {
    showModal('El nombre del partido solo puede contener letras y números.', function() { return; });
    return;
  }
  

  if (!partyColor) {
    showModal('Debes ingresar un color relativo al partido', function() { return; });
    return;
  }

  if (logoURL && !isValidURL(logoURL)) {
  showModal(`Debes ingresar una URL válida para el logo de ${partyName}.`, function() { return; });
  return;
}


  const newParty = {
    name: partyName,
    color: partyColor,
    logo: logoURL,
  };

  
  if (!parties[acName]) {
  parties[acName] = [];
  }

  const isPartyDuplicated = parties[acName].some(party => party.name === partyName);

  if (isPartyDuplicated) {
    showModal(`Ya existe un partido de nombre ${partyName} en ${acName}.`, function() { return; });
    return;
  }

  if (!logoURL) {
    showModal(`Estás ingresando el partido ${partyName} sin un logo. El espacio del logo será reemplazado por el color del partido.`, function () {
      showModal(`¿Confirmas que deseas añadir ${partyName} a ${acName}?`, function() {
        parties[acName].push(newParty);
        updatePartyList();
      }, function() {return; });
    }, function() {return; });
  } else {
    showModal(`¿Confirmas que deseas añadir ${partyName} a ${acName}?`, function () {
      parties[acName].push(newParty);
      updatePartyList();
    }, function() {return; });
  }

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
    for (let i = 0; i <acParties.length; i++) {
      const party = acParties[i];
      const partyListItem = document.createElement('li');
      partyListItem.textContent = party.name;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Eliminar'
      deleteButton.addEventListener('click', function() {
        showModal(`¿Confirmas que deseas eliminar a ${party.name} de ${acName}?`, function () {
          acParties.splice(i, 1);
          updatePartyList();
        }, function() {return; });  
      });
      
      partyListItem.appendChild(deleteButton);
      partyListItems.appendChild(partyListItem);
    }
  }
}

function formatPartiesList(parties) {
  if (parties.length === 1) {
    return parties[0];
  } else if (parties.length === 2) {
    return `${parties[0]} ni ${parties[1]}`;
  } else {
    let lastParty = parties.pop();
    return `${parties.join(', ')} ni ${lastParty}`;
  }
}


function generateVotingForm() {
  // Obtengo el nombre de la provincia y la comunidad autónoma seleccionada
  const provinceName = provinceSelect.value;
  const acName = provinceToAcMap[provinceName]; 

  // Obtengo la lista de partidos para la comunidad autónoma seleccionada
  const acParties = parties[acName];

  // Obtengo el contenedor del formulario
  const formContainer = document.querySelector('.voting-form');
  
  // Borra el contenido actual del formulario
  formContainer.innerHTML = '';

  // Crea el título del formulario de votos
  const formTitle = document.createElement('h2');
  formTitle.textContent = 'Ingresar votos';
  
  // Añade el título al contenedor del formulario
  formContainer.appendChild(formTitle);
  
  // Crea un formulario
  const form = document.createElement('form');
  form.action = '/calculateSeats';
  form.method = 'POST';

  const table = document.createElement('table'); 

  const tableHead = document.createElement('thead');
  const tableRow = document.createElement('tr');

  const headers = ['Partido', 'Votos', '%', 'Escaños'];

  headers.forEach(header => {
    const th= document.createElement('th');
    th.textContent = header;
    tableRow.appendChild(th);
  });

  tableHead.appendChild(tableRow);
  table.appendChild(tableHead);

  const tableBody = document.createElement('tbody');


  // Crea un campo de entrada para cada partido
  if (acParties) {
    for (const party of acParties) {

      const tableRow = document.createElement('tr');

      const partyCell = document.createElement('td');
      partyCell.textContent = party.name;
      tableRow.appendChild(partyCell);

      const label = document.createElement('label');
      label.for = `votes-${party.name}`;
      label.textContent = `${party.name}:`;

      const input = document.createElement('input');
      input.type = 'number';
      input.id = `votes-${party.name}`;
      input.name = `votes-${party.name}`;
      input.style.width = '60px';

      const votesCell = document.createElement('td');
      votesCell.appendChild(input);
      tableRow.appendChild(votesCell);

      const percentageCell = document.createElement('td');
      tableRow.appendChild(percentageCell);

      const seatsCell = document.createElement('td');
      tableRow.appendChild(seatsCell);


      tableBody.appendChild(tableRow);
    }
  }

  const blankRow = document.createElement('tr');
  
  // Añade campos para los votos nulos y en blanco
  const blankLabel = document.createElement('td');
  blankLabel.textContent = 'Votos en blanco';
  blankRow.appendChild(blankLabel);

  const blankInput = document.createElement('input');
  blankInput.type = 'number';
  blankInput.id = 'blankVotes';
  blankInput.name = 'blankVotes';
  blankInput.style.width = '60px';

  const blankVotesCell = document.createElement('td');
  blankVotesCell.appendChild(blankInput);
  blankRow.appendChild(blankVotesCell);

  const blankPercentageCell = document.createElement('td');
  blankRow.appendChild(blankPercentageCell);

  const blankSeatsCell = document.createElement('td');
  blankRow.appendChild(blankSeatsCell);

  tableBody.appendChild(blankRow);

  const nullRow = document.createElement('tr');
  
  const nullLabel = document.createElement('td');
  nullLabel.textContent = 'Votos nulos';
  nullRow.appendChild(nullLabel);
  
  const nullInput = document.createElement('input');
  nullInput.type = 'number';
  nullInput.id = 'nullVotes';
  nullInput.name = 'nullVotes';
  nullInput.style.width = '60px';

  const nullVotesCell = document.createElement('td');
  nullVotesCell.appendChild(nullInput);
  nullRow.appendChild(nullVotesCell);
  
  const nullPercentageCell = document.createElement('td');
  nullRow.appendChild(nullPercentageCell);

  const nullSeatsCell = document.createElement('td');
  nullRow.appendChild(nullSeatsCell);
  
  
  tableBody.appendChild(nullRow);
  
  // Añade un botón de envío al formulario
  const submit = document.createElement('input');
  submit.type = 'submit';
  submit.value = 'Calcular';

  // Añade el formulario al contenedor
  formContainer.appendChild(form);
  table.appendChild(tableBody);
  formContainer.appendChild(table);
  form.appendChild(table);
  form.appendChild(submit);

  console.log("Formulario de votación generado");
  

  partyEntryForm.classList.add('hide');
  partyList.classList.add('hide');
  formContainer.classList.remove('hide');
  formContainer.style.display = 'block';

  form.addEventListener('submit', async function(event) {
    event.preventDefault();

    let votesData = {
      type: 'generales',
      province: provinceName,
      community: acName,
      parties: [],
    };

    let partiesWithoutVotes = [];


    for (let i = 0; i < form.elements.length; i++) {
      const element = form.elements[i];

      if (element.type === 'number') {
        let partyName = element.name.replace('votes-', '');

        if (partyName === 'blankVotes') {
          partyName = 'votos en blanco';
        } else if (partyName === 'nullVotes') {
          partyName = 'votos nulos';
        }

        if (element.value === '') {
          partiesWithoutVotes.push(partyName);
        } else if (element.value < 0 || !Number.isInteger(Number(element.value))) {
          showModal('Los votos deben ser números enteros no negativos');
          return;
        } else { 
          votesData.parties.push({
            name: partyName,
            votes: parseInt(element.value, 10),
          });
        }    
      }
    }

    if (partiesWithoutVotes.length > 0) {
      const confirmed = await new Promise(resolve => {
        if (partiesWithoutVotes.length === 1) {
          showModal(`No has introducido un número de votos para ${formatPartiesList(partiesWithoutVotes)}. Se le asignarán cero votos.`, resolve);
        } else {
          showModal(`No has introducido un número de votos para ${formatPartiesList(partiesWithoutVotes)}. Se les asignarán cero votos a cada uno.`, resolve);
        }
      });
      
      if (confirmed) {
        for (let partyName of partiesWithoutVotes) {
          votesData.parties.push({
            name: partyName,
            votes: 0,
          });
        }        
      } else {
          return;
      }
    }  

    console.log(votesData);

    fetch('/api/calculateSeats', {
            method: 'POST',
            headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(votesData),
    })
    .then(response => response.json())
    .then(seatResults => {

      console.log(seatResults);
      // Selecciono todas las filas de la tabla del cuerpo
      const rows = Array.from(document.querySelector('tbody').children);
      // Actualizo la tabla con los resultados de los escaños
      for (const result of seatResults) {

        // Busco la fila que tiene el nombre del partido en la primera celda
        const row = rows.find(row => row.children[0].textContent.toLowerCase() === result.party.toLowerCase());

        if (row) {
          // Actualizo la tercera celda con el porcentaje de votos
          row.children[2].textContent = result.percentage.toFixed(2) + '%';
          // Actualizo la cuarta celda con el número de escaños
          if(result.party !== 'votos en blanco' && result.party !== 'votos nulos') {
          row.children[3].textContent = result.seats;
          }
        }
      }


    })
    .catch(error => console.error('Error', error));
  });
}


});


/* Todavía se necesita verificar que tanto una elección como una cámara estén seleccionadas antes de llenar las comunidades autónomas, y verificar que se haya seleccionado una comunidad autónoma antes de llenar las provincias..
*/