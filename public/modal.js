function showModal(message) {
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modal-message');
  modal.style.display = "block";
  modalMessage.textContent = message;
}

const closeModalButton = document.getElementById('modal-close');
closeModalButton.addEventListener('click', function() {
  const modal = document.getElementById('modal');
  modal.style.display = "none";
});
