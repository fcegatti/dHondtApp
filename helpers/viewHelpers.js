function initializeView(electionType = null, chamberType = null, ac = null) {

  const electionMessage = document.querySelector('.election-msg');
  const chamberMessage = document.querySelector('.chamber-msg');
  const acMessage = document.querySelector('.ac-msg');
  const partyEntryForm = document.querySelector('#party-entry');
  const partyList = document.querySelector('#party-list');
  const mapTitle = document.querySelector('#region-map-title');
  const regionMapPlaceholder = document.querySelector('.region-map-placeholder');

  partyEntryForm.classList.add('hide');
  partyList.classList.add('hide');
  
  if (!electionType) {

    electionMessage.textContent = "Seleccione un tipo de elección";
    chamberMessage.textContent = '';
    acMessage.textContent = '';
    mapTitle.textContent = 'España';
  } else if (!chamberType) {
    chamberMessage.textContent = "Seleccione una cámara";
    electionMessage.textContent = '';
    acMessage.textContent = '';
    mapTitle.textContent = 'España';
  } else if (!ac) {
    acMessage.textContent = "Seleccione una comunidad autónoma";
    electionMessage.textContent = '';
    chamberMessage.textContent = '';
    mapTitle.textContent = 'España';
  } else {
    electionMessage.textContent = '';
    chamberMessage.textContent = '';
    acMessage.textContent = '';
    mapTitle.textContent = `${ac}`
  }
  
  resetGraphics();
}

function resetGraphics() {
  
}
