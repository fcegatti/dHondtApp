// Obtén referencias a los elementos del formulario que necesitaremos
document.addEventListener('DOMContentLoaded', function() {
const electionTypeSelect = document.getElementById('electionType');
const chamberSelect = document.getElementById('chamber');
const addPartyForm = document.forms['addParty'];

// Definimos las funciones que manejarán los eventos
function handleElectionTypeChange(event) {
  // Por ahora, solo vamos a imprimir el tipo de elección seleccionado en la consola
  const selectedElectionType = event.target.value;
  console.log('Tipo de elección seleccionado:', selectedElectionType);
}

function handleChamberChange(event) {
  // Por ahora, solo vamos a imprimir la cámara seleccionada en la consola
  const selectedChamber = event.target.value;
  console.log('Cámara seleccionada:', selectedChamber);
}

function handleAddPartySubmit(event) {
  event.preventDefault();  // Evita que la página se recargue cuando se envía el formulario

  // Obtén los valores del formulario
  const partyName = event.target.elements['party'].value;
  const partyColor = event.target.elements['color'].value;

  // Por ahora, solo vamos a imprimir estos valores en la consola
  console.log('Partido añadido:', partyName, partyColor);
}

// Agregamos los event listeners a los elementos correspondientes
electionTypeSelect.addEventListener('change', handleElectionTypeChange);
chamberSelect.addEventListener('change', handleChamberChange);
addPartyForm.addEventListener('submit', handleAddPartySubmit);

});
