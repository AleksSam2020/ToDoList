import { Button } from "../buttons";

import styles from './styles.module.scss';

export function Toast(content) {
  const toast = document.createElement('div');

  toast.className = 'toast align-items-center';
  toast.classList.add(styles.toast);
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  toast.setAttribute('aria-atomic', 'true');

  toast.append(DFlex(content));

  return toast;
}

export function DFlex(content) {
  const dFlex = document.createElement('div');
  dFlex.className = 'd-flex';

  const btn =  Button({
    classList: 'btn-close me-2 m-auto',
    type: 'button'
  });

  btn.setAttribute('data-bs-dismiss', 'toast');
  btn.setAttribute('aria-label', 'Закрыть');
  
  dFlex.append(Text(content), btn);

  return dFlex;
}


export function Text(content) {
  const text = document.createElement('div');
  text.classList.add('toast-body');
  text.textContent = content;
  
  return text;
}

export function removeToast() {
  setTimeout(() => {
    document.querySelector('div.toast')?.remove();
  }, 3000);
}