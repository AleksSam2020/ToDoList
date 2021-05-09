import { CreateIcon } from '../base/icons';
import { ThemeSwither } from '../base/theme-switcher';
import styles from './styles.module.scss';

import '../base/theme-switcher/styles.scss';

export function Header() {
  const header = document.createElement('header');
  const div = document.createElement('div');

  header.classList.add(styles.header);

  div.textContent = 'TO DO LIST';
  div.append(CreateIcon('fas fa-check'));
  header.append(div, ThemeSwither());

  return header;
}