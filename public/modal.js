const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const closeModalButton = document.getElementById('modal-close');
const continueButton = document.getElementById('continue-button');

function showModal(message, onConfirm = null) {
  modal.style.display = "block";
  modalMessage.textContent = message;

  if (onConfirm) {
    closeModalButton.style.display = "inline-block";
    continueButton.textContent = 'Continuar';
    continueButton.onclick = function () {
      modal.style.display = "none";
      onConfirm();
    }
  } else {
    closeModalButton.style.display = "none";
    continueButton.textContent = "Aceptar";
    continueButton.onclick = function () {
    modal.style.display = "none";
    }
  } 
}

closeModalButton.addEventListener('click', function() {
  modal.style.display = "none";
});
