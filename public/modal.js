const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const closeModalButton = document.getElementById('modal-close');
const continueButton = document.getElementById('continue-button');

function showModal(message, onConfirm = null) {
  modal.style.display = "block";
  modalMessage.textContent = message;

  continueButton.textContent = onConfirm ? 'Continuar' : 'Aceptar';
  continueButton.onclick = function () {
    modal.style.display = "none";
    if (onConfirm) {
      onConfirm();
    }
  }

}

closeModalButton.addEventListener('click', function() {
  modal.style.display = "none";
});
