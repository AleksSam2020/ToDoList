import { removeDatepicker } from "../../main/components/navigation/form-add-task/component";
import { Button } from "../buttons";
import { closeModal } from "./helpers";

import './styles.scss';
import styles from './styles.module.scss';

export function Modal({title, body,hasFooterCloseButton }) {
  const modal = document.createElement('div');

  modal.classList.add('modal', styles.show);
  modal.setAttribute('tabindex', '-1');

  modal.append(ModalDialog({title, body, hasFooterCloseButton}));

  return modal;
}


function ModalDialog({title, body, hasFooterCloseButton}) {
  const modalDialog = document.createElement('div');

  modalDialog.classList.add('modal-dialog');
  modalDialog.append(ModalContent({title, body, hasFooterCloseButton}))

  return modalDialog;
}

function ModalContent({title, body, hasFooterCloseButton}) {
  const modalContent = document.createElement('div');

  modalContent.classList.add('modal-content');
  modalContent.append(ModalHeader(title), ModalBody(body));

  if(hasFooterCloseButton) {
    modalContent.append(ModalFooter(hasFooterCloseButton));
  }

  return modalContent;
}

function ModalHeader(title) {
  const modalHeader = document.createElement('div');

  modalHeader.classList.add('modal-header');
  modalHeader.append(ModalTitle(title), modalCloseHeaderButton());

  return modalHeader;
}

function ModalBody(body) {
  const modalBody = document.createElement('div');

  modalBody.classList.add('modal-body');

  if(typeof body === 'string') {
    modalBody.innerHTML = body;
  } else {
    modalBody.append(body);
  }

  return modalBody;
}

function ModalFooter(hasFooterCloseButton) {
  const modalFooter = document.createElement('div');

  modalFooter.classList.add('modal-footer');

  if(hasFooterCloseButton){
    modalFooter.append(modalCloseFooterButton());
  }


  return modalFooter;
}

function ModalTitle(title) {
  const modalTitle = document.createElement('h5');

  modalTitle.classList.add('modal-title');
  modalTitle.textContent = title;

  return modalTitle;
}

function modalCloseHeaderButton() {
  const btn = Button({
    classList: 'btn-close',
  });

  btn.setAttribute('type', 'button');

  btn.addEventListener('click', closeModal );
  removeDatepicker();
  return btn;
}

function modalCloseFooterButton() {
  const btn = Button({
    classList: 'btn btn-secondary',
    content: 'Close'
  });

  btn.setAttribute('type', 'button');
  btn.textContent = 'Close';

  btn.addEventListener('click', closeModal );
  removeDatepicker();
  return btn;
}
