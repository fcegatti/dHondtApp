function initializeView(electionType = null, chamberType = null, ac = null) {

  const electionMessage = document.querySelector('.election-msg');
  const chamberMessage = document.querySelector('.chamber-msg');
  const acMessage = document.querySelector('.ac-msg');
  //const regionTitle = document.querySelector('#region-title');
  const regionMapPlaceholder = document.querySelector('.region-map-placeholder');
  const partyEntryForm = document.querySelector('#addParty');
  const partyList = document.querySelector('#party-list');

  if (!electionType) {

    electionMessage.textContent = "Seleccione un tipo de elección";
    chamberMessage.textContent = '';
    acMessage.textContent = '';
    partyEntryForm.computedStyleMap.display = 'none';
    partyList.computedStyleMap.display = 'none';
  } else if (!chamberType) {
    chamberMessage.textContent = "Seleccione una cámara";
    electionMessage.textContent = '';
    acMessage.textContent = '';
    partyEntryForm.computedStyleMap.display = 'none';
    partyList.computedStyleMap.display = 'none';
  } else if (!ac) {
    acMessage.textContent = "Seleccione una comunidad autónoma";
    electionMessage.textContent = '';
    chamberMessage.textContent = '';
    partyEntryForm.computedStyleMap.display = 'none';
    partyList.computedStyleMap.display = 'none';
  } else {
    electionMessage.textContent = '';
    chamberMessage.textContent = '';
    acMessage.textContent = '';
    partyEntryForm.computedStyleMap.display = 'block';
    partyList.computedStyleMap.display = 'block'; 
  }

  if (ac) {
    regionMapPlaceholder.textContent = `Mapa de ${ac}`;
  } else {
    regionMapPlaceholder.textContent = `El mapa de la región se mostrará aquí`;
  }
  
  resetGraphics();
}

function resetGraphics() {
  
}
