import styles from './styles.module.scss';

export function Spinner() {
  const spinner = document.createElement('i');

  spinner.className = 'fas fa-spinner fa-3x fa-spin';
  spinner.classList.add(styles.spinner);

  return spinner;
}

export function loadingSpinner() {
  const spinner = Spinner();

  spinner.classList.add('loading');

  return spinner;
}

export function startLoadingSpinner() {
  document.body.append(loadingSpinner());
}

export function stopLoadingSpinner() {
  document.querySelector('.loading')?.remove();
}
