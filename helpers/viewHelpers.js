function initializeView(electionType = null, chamberType = null, ac = null) {

  const electionMessage = document.querySelector('.election-msg');
  const chamberMessage = document.querySelector('.election-msg');
  const acMessage = document.querySelector('.ac-msg');
  //const regionTitle = document.querySelector('#region-title');
  const regionMapPlaceholder = document.querySelector('.region-map-placeholder');

  electionMessage.textContent = electionType ? '' : "Seleccione un tipo de elección";
  chamberMessage.textContent = chamberType ? '' : "Seleccione una cámara";
  acMessage.textContent = ac ? '' : "Seleccione una comunidad autónoma";
  //regionTitle.textContent = ac ? `Mapa de ${ac}` : "Mapa de la región";

  if (ac) {
    regionMapPlaceholder.textContent = `Mapa de ${ac}`;
  } else {
    regionMapPlaceholder.textContent = `El mapa de la región se mostrará aquí`;
  }
  
  resetGraphics();
}

function resetGraphics() {
  
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initializeView,
    resetGraphics
  };
  console.log("Exportando funciones de viewHelpers para Node.js");
} else {
  console.log("viewHelpers se está ejecutando en el navegador");
}