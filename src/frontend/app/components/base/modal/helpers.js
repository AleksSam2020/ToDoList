export function closeModal(e) {
  return e.target.closest('.modal').remove();
}

export function ModalClose() {
  document.querySelector('.modal')?.remove();
}