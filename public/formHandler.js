// Obtén referencias a los elementos del formulario que necesitaremos
document.addEventListener('DOMContentLoaded', function() {
const electionTypeSelect = document.getElementById('electionType');
const chamberSelect = document.getElementById('chamber');
const addPartyForm = document.forms['addParty'];
let parties = [];


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

function handleAddPartySubmit(event) {
  event.preventDefault();  

  // Obtener los valores del formulario
  const partyName = event.target.elements['party'].value;
  const partyColor = event.target.elements['color'].value;
  const newParty = {
    name: partyName,
    color: partyColor
  };

  parties.push(newParty);

  console.log('Partidos actuales:', parties);

  
}

// Agregamos los event listeners a los elementos correspondientes
electionTypeSelect.addEventListener('change', handleElectionTypeChange);
chamberSelect.addEventListener('change', handleChamberChange);
addPartyForm.addEventListener('submit', handleAddPartySubmit);

});
