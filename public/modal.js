const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modal-message');
const closeModalButton = document.getElementById('modal-close');
const continueButton = document.getElementById('continue-button');

function showModal(message, onConfirm = null, onCancel = null) {
  modal.style.display = "block";
  modalMessage.textContent = message;

  if (onCancel) {
    closeModalButton.style.display = "inline-block";
    continueButton.textContent = 'Continuar';
  } else {
    closeModalButton.style.display = "none";
    continueButton.textContent = "Aceptar";
  }

  continueButton.onclick = function () {
    modal.style.display = "none";
    if (typeof onConfirm === 'function') {
      onConfirm(true);
    }
  }

  closeModalButton.onclick = function () {
    modal.style.display = "none";
    if (typeof onCancel === 'function') {
      onCancel(false);
    }
  }
}