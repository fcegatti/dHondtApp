function initializeView(electionType = null, chamberType = null, ac = null) {

  const electionMessage = document.querySelector('.election-msg');
  const chamberMessage = document.querySelector('.chamber-msg');
  const acMessage = document.querySelector('.ac-msg');
  const mapTitle = document.querySelector('#map-title');
  const regionMapPlaceholder = document.querySelector('.region-map-placeholder');
  const partyEntryForm = document.querySelector('#addParty');
  const partyList = document.querySelector('#party-list');

  if (!electionType) {

    electionMessage.textContent = "Seleccione un tipo de elección";
    chamberMessage.textContent = '';
    acMessage.textContent = '';
    partyEntryForm.style.display = 'none';
    partyList.style.display = 'none';
    mapTitle.textContent = 'España';
  } else if (!chamberType) {
    chamberMessage.textContent = "Seleccione una cámara";
    electionMessage.textContent = '';
    acMessage.textContent = '';
    partyEntryForm.style.display = 'none';
    partyList.style.display = 'none';
    mapTitle.textContent = 'España';
  } else if (!ac) {
    acMessage.textContent = "Seleccione una comunidad autónoma";
    electionMessage.textContent = '';
    chamberMessage.textContent = '';
    partyEntryForm.style.display = 'none';
    partyList.style.display = 'none';
    mapTitle.textContent = 'España';
  } else {
    electionMessage.textContent = '';
    chamberMessage.textContent = '';
    acMessage.textContent = '';
    partyEntryForm.style.display = 'block';
    partyList.style.display = 'block';
    mapTitle.textContent = `${ac}`
  }
  
  resetGraphics();
}

function resetGraphics() {
  
}
