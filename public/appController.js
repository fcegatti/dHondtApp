// Obtenemos referencias a los elementos del formulario que necesitaremos
document.addEventListener('DOMContentLoaded', function() {
  
const electionTypeSelect = document.getElementById('electionType');
const chamberSelect = document.getElementById('chamber');
const acSelect = document.getElementById('autonomousCommunity');
const provinceSelect = document.getElementById('province');
const partyEntryForm = document.querySelector('#party-entry');
const partyEntryTitle = document.querySelector('#party-entry-title');
const addPartyForm = document.forms['addParty'];
const partyList = document.querySelector('#party-list');
const partyListTitle = document.querySelector('#party-list-title');
const partyListItems = document.querySelector('#party-list-items');
const votingForm = document.querySelector('#voting-form');
const mapTitle = document.querySelector('#region-map-title');
const regionMapPlaceholder = document.querySelector('#region-map-placeholder');
let electionsData = null;
let provinceToAcMap = {};
let parties = {};

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
      let type = event.target.value;

      if (['autonomicas', 'municipales','europeas'].includes(type)) {
        let displayType = type;
        if (type === 'autonomicas') {
          displayType = 'autonómicas';
        }
        
        showModal(`El cálculo de elecciones ${displayType} no está disponible en esta versión`, function() { return; });
        event.target.selectedIndex = 0;
        return;     
      }  

      chamberSelect.removeAttribute('disabled');
      acSelect.setAttribute('disabled', 'disabled');
      provinceSelect.setAttribute('disabled', 'disabled');

      initializeView(type);
      chamberSelect.selectedIndex = 0;
      acSelect.selectedIndex = 0;
      provinceSelect.selectedIndex = 0;
      
      handleElectionTypeChange(event);
      fillAutonomousCommunities(event);
    });

    chamberSelect.addEventListener('change', function(event) {
      if (!electionTypeSelect.value) {
        showModal('Por favor, seleccione un tipo de elección primero', function() {return; });
        event.target.selectedIndex = 0;
        return;
      }

      if (event.target.value === 'senado') {
        showModal('El cálculo de elecciones al senado no está disponible en esta versión', function() { return; });
        event.target.selectedIndex = 0;
        return;  
      }

      acSelect.removeAttribute('disabled');
      provinceSelect.setAttribute('disabled', 'disabled');

      initializeView(electionTypeSelect.value, event.target.value);

      acSelect.selectedIndex = 0;
      provinceSelect.selectedIndex = 0;
      mapTitle.textContent = 'España';
      regionMapPlaceholder.textContent = `Mapa de España`;

      handleChamberChange(event);
      fillAutonomousCommunities(event);
    });

    acSelect.addEventListener('change', fillProvinces);
    acSelect.addEventListener('change', function(event) {
      if (!electionTypeSelect.value || !chamberSelect.value) {
        showModal('Por favor, seleccione un tipo de elección y una cámara primero', function() {return; });
        event.target.selectedIndex = 0;
        return;
      }

      if (event.target.value === '') {
        resetACView();
        return;
      }

      votingForm.classList.add('hide');
      mapTitle.textContent = `${acSelect.value}`;
      regionMapPlaceholder.textContent = `Mapa de ${acSelect.value}`;

      provinceSelect.removeAttribute('disabled');

      initializeView(electionTypeSelect.value, chamberSelect.value, event.target.value);

      provinceSelect.selectedIndex = 0;

      console.log('Comunidad Autónoma seleccionada:', acSelect.value);

      const acName = acSelect.value;
      partyListTitle.textContent = `Partidos de ${acName}`;
      const encodedAC = encodeURIComponent(acName);

      fetch(`api/getACParties/${encodedAC}`)
        .then(response => response.json())
        .then(partiesFromAPI => {
          if (partiesFromAPI && partiesFromAPI.length > 0) {
            parties[acName] = partiesFromAPI;
            updatePartyList();
            partyEntryForm.classList.add('hide');
            partyList.classList.remove('hide');
          } else if (parties[acName] && parties[acName].length > 0) {
              updatePartyList();
              partyEntryForm.classList.remove('hide');
              partyList.classList.remove('hide');
          } else {
              partyEntryTitle.textContent = `Ingresar partidos`;
              partyEntryForm.classList.remove('hide');
              partyList.classList.add('hide');
          }
        })
        .catch( error => {
          console.error('Error fetching parties for autonomous community', error);
      });
    });
    provinceSelect.addEventListener('change', (event) => {
      console.log(`Provincia seleccionada: ${event.target.value} - ${new Date().toISOString()}`);
      const selectedProvince = event.target.value;
      votingForm.classList.add('hide');

      const acName = acSelect.value;
      
      if (selectedProvince === '') {
        partyList.classList.remove('hide');
        mapTitle.textContent = `${acSelect.value}`;
        regionMapPlaceholder.textContent = `Mapa de ${acSelect.value}`;
        return;
      } else {
        mapTitle.textContent = selectedProvince;
        regionMapPlaceholder.textContent = `Mapa de ${selectedProvince}`;
      }

      console.log(`Solicitando partidos de la comunidad autónoma: ${acName} - ${new Date().toISOString()}`);
      fetch(`api/getACParties/${encodeURIComponent(acName)}`)
        .then(response => response.json())
        .then(partiesFromAPI => {
          if (partiesFromAPI && partiesFromAPI.length > 0) {
            generateVotingForm();
          } else if (!parties[acName] || parties[acName].length === 0) {
            showModal(`Debe agregar al menos un partido en ${acName} antes de continuar`, function() {
              provinceSelect.selectedIndex = 0;
              mapTitle.textContent = `${acSelect.value}`;
              regionMapPlaceholder.textContent = `Mapa de ${acSelect.value}`;
              partyEntryForm.classList.remove('hide');
            });
          } else if (parties[acName].length === 1) {
            showModal(`Está añadiendo solamente un partido en ${acName}. Si confirma, no podrá añadir más partidos en esta comunidad autónoma. ¿Desea continuar?`, function() {
              partiesToJson(acName, selectedProvince);
            }, 
            function() {
              provinceSelect.selectedIndex = 0;
              mapTitle.textContent = `${acSelect.value}`;
              regionMapPlaceholder.textContent = `Mapa de ${acSelect.value}`;
              partyEntryForm.classList.remove('hide');
              updatePartyList();
            });
          } else {
            showModal(`Si continúa, se agregarán los partidos de la lista a todas las provincias de ${acName} y ya no se podrán incluir otros. ¿Desea continuar?`, function() {
              partiesToJson(acName, selectedProvince);
        },
        function() {
          console.log("Volver seleccionado");
          provinceSelect.selectedIndex = 0;
          mapTitle.textContent = `${acSelect.value}`;
          regionMapPlaceholder.textContent = `Mapa de ${acSelect.value}`;
          partyEntryForm.classList.remove('hide');
          updatePartyList();
        });
          }
        })
        .catch(error => console.error('Error:', error));
    });
    addPartyForm.addEventListener('submit', handleAddPartySubmit);

  })
  .catch(error => console.error('Error:', error));

function resetACView() {
  partyList.classList.add('hide');
  votingForm.classList.add('hide');
  mapTitle.textContent = 'España';
  regionMapPlaceholder.textContent = 'Mapa de España';
}
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

function getSelectedProvince(acName, provinceName) {
  const ac = electionsData.autonomousCommunities.find(ac => ac.name === acName);
  return ac ? ac.provinces.find(province => province.name === provinceName) : null;
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
 
  const acParties = parties[acName] || [];
  if (acParties.length === 0) {
    partyList.classList.add('hide');
  } else {
    partyList.classList.remove('hide');
  }

  for (let i = 0; i < acParties.length; i++) {
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

function formatPartiesList(parties) {
  let partiesGrammar = [...parties]; //Hago una copia porque esta función modificaba el original y daba error si se añadían 3 campos con o votos.
  if (partiesGrammar.length === 1) {
    return partiesGrammar[0];
  } else if (partiesGrammar.length === 2) {
    return `${partiesGrammar[0]} ni ${partiesGrammar[1]}`;
  } else {
    let lastParty = partiesGrammar.pop();
    return `${partiesGrammar.join(', ')} ni ${lastParty}`;
  }
}

function generateVotingForm() {
  console.log(`Inicio de generateVotingForm() - ${new Date().toISOString()}`);
  // Obtengo el nombre de la provincia y la comunidad autónoma seleccionada
  const provinceName = provinceSelect.value;
  if (!provinceName) return;
  const acName = provinceToAcMap[provinceName]; 
  
  // Borra el contenido actual del formulario
  votingForm.innerHTML = '';

  console.log(`Solicitando partidos de la comunidad autónoma para generar formulario: ${acName} - ${new Date().toISOString()}`);
  fetch(`/api/getACParties/${acName}`)
  .then(response => {
    if (!response.ok) {  
      throw new Error(`Error fetching parties: ${response.statusText}`);
    }
    return response.json();
  })
  .then(parties => {
    if (!parties || !Array.isArray) {
      console.error("Datos recividos de la API:", parties);
      throw new Error("No se recibieron datos válidos de la API");
    }
    console.log(`Partidos obtenidos para generar formulario: ${parties.length} partidos - ${new Date().toISOString()}`);
    const acParties = parties;
    
    // Crea el título del formulario de votos
    const formTitle = document.createElement('h2');
    formTitle.textContent = 'Ingresar votos';
    
    // Añade el título al contenedor del formulario
    votingForm.appendChild(formTitle);
    
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
    votingForm.appendChild(form);
    table.appendChild(tableBody);
    votingForm.appendChild(table);
    form.appendChild(table);
    form.appendChild(submit);
    
    console.log("Formulario de votación generado");
    
    
    partyEntryForm.classList.add('hide');
    partyList.classList.add('hide');
    votingForm.classList.remove('hide');
    
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
          
          partyColor = acParties?.find(party => party.name === partyName)?.color;
          
          
          
          if (element.value === '') {
            partiesWithoutVotes.push(partyName);
          } else if (element.value < 0 || !Number.isInteger(Number(element.value))) {
            showModal('Los votos deben ser números enteros no negativos');
            return;
          } else { 
            
            if (partyName !== 'votos en blanco' && partyName !== 'votos nulos') {
              partyColor = acParties.find(party => party.name === partyName).color;
            }
            
            votesData.parties.push({
              name: partyName,
              votes: parseInt(element.value, 10),
              color: partyColor,
            });
          }    
        }
      }

      const zeroVotesEntered = votesData.parties.every(party => {
        if (party.name.toLowerCase() === 'votos nulos') return true;
        return party.votes === 0;
      });
      const nullVotesOnly = votesData.parties.some(party => party.name.toLowerCase() === 'votos nulos' && party.votes > 0);

      console.log('zeroVotesEntered: ', zeroVotesEntered);
      console.log('nullVotesOnly: ', nullVotesOnly);

      if (zeroVotesEntered && nullVotesOnly) {
        showModal('No es posible calcular escaños cuando solo se han ingresado votos nulos. Por favor, ingrese votos en al menos un partido.');
        return;
      } else if (zeroVotesEntered) {
        showModal('No es posible calcular escaños sin ningún voto ingresado. Por favor, ingrese votos en al menos un campo.');
        return;
      }
      
      votesData.parties.forEach(party => {
        if (party.name === 'votos en blanco') {
          party.color = 'white';
        } else if (party.name === 'votos nulos') {
          party.color = 'gray';
        }
      });
      
      if (partiesWithoutVotes.length > 0) {
        let message;
        if (partiesWithoutVotes.length === 1) {
          message = `No has introducido un número de votos para ${formatPartiesList(partiesWithoutVotes)}. Se le asignarán cero votos. ¿Desea continuar?`;
        } else {
          message = `No has introducido un número de votos para ${formatPartiesList(partiesWithoutVotes)}. Se les asignarán cero votos a cada uno. ¿Desea continuar? `;
        } 
       
        showModal(message, function() {
          //Continuar
          for (let partyName of partiesWithoutVotes) {
            let partyColor;
            if (partyName === 'votos en blanco') {
              partyColor = 'white';
            } else if (partyName === 'votos nulos') {
              partyColor = 'gray';
            } else {
              const partyInfo = acParties.find(p => p.name === partyName);
              partyColor = partyInfo?.color;
            }
              votesData.parties.push({
              name: partyName,
              votes: 0,
              color: partyColor,
            });
          }
          sendDataForCalculation(votesData);
        
        },
        function() {
          //Volver
          return;
        });
      } else {        
        sendDataForCalculation(votesData);
      }      
    });
  })
  .catch(error => {
    console.error('Error fetching parties:', error);
  })
}

function partiesToJson(acName, selectedProvince) {
  console.log("Continuar seleccionado");

              const dataToSend = {
                acName: acName,
                parties: parties[acName]
              };

              console.log(`Actualizando partidos en el servidor para ${acName} - ${new Date().toISOString()}`);
              fetch('/post/updateParties', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),               
              })
              .then(response => response.json())
              .then(data => {
                console.log(`Partidos actualizados con éxito para ${acName} - ${new Date().toISOString()}`);

                console.log(data.message);

                generateVotingForm();
                const selectedProvinceData = getSelectedProvince(acSelect.value,   selectedProvince);
                if (selectedProvinceData) {
                  if (selectedProvinceData.seatResults) {
                    const chartData = selectedProvinceData.seatResults.map(result => ({
                      party: result.party,
                      seatsPercentage: result.seatsPercentage,
                      color: result.color,
                    }));
                    chartData = sortPartiesForArcDisplay(chartData);
                    console.log(chartData);
                    drawSeatsArc(chartData);
                  }
                } else {
                  const unassignedChartData = [{
                    party: 'No Asignados',
                    seatsPercentage: 100,
                    color: 'gray'
                  }];
                  drawSeatsArc(unassignedChartData);
                }
              })
              .catch(error => console.error('Error', error));
}

function sendDataForCalculation(votesData) {
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
        seatResults.forEach(result => {
          const partyFromVotesData = votesData.parties.find(p => p.name === result.party);
          if (partyFromVotesData) {
            result.color = partyFromVotesData.color;
          }
        });
        
        console.log(seatResults);
        
        let chartData = seatResults
        .filter(result => result.seatsPercentage > 0)
        .map(result => ({
          party: result.party,
          seatsPercentage: result.seatsPercentage,
          color: result.color,
        }));
        
        chartData = sortPartiesForArcDisplay(chartData);
        console.log(chartData);
        drawSeatsArc(chartData);
        // Selecciono todas las filas de la tabla del cuerpo
        const rows = Array.from(document.querySelector('tbody').children);
        // Actualizo la tabla con los resultados de los escaños
        for (const result of seatResults) {
          
          // Busco la fila que tiene el nombre del partido en la primera celda
          const row = rows.find(row => row.children[0].textContent.toLowerCase() === result.party.toLowerCase());
          
          if (row) {
            // Actualizo la tercera celda con el porcentaje de votos
            row.children[2].textContent = result.votesPercentage.toFixed(2) + '%';
            if(result.party !== 'votos en blanco' && result.party !== 'votos nulos') {
            // Actualizo la cuarta celda con el número de escaños
              row.children[3].textContent = result.seats;
            }
          }
        }
        
        
      })
      .catch(error => console.error('Error:', error));
}
});
/* Todavía se necesita verificar que tanto una elección como una cámara estén seleccionadas antes de llenar las comunidades autónomas, y verificar que se haya seleccionado una comunidad autónoma antes de llenar las provincias..
*/