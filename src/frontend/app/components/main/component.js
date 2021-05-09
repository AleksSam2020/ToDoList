import { Content } from "./components/content/component";
import { Nav } from "./components/navigation";

import styles from './styles.module.scss';

export function Main() {
  const main = document.createElement('main');

  main.classList.add(styles.main);

  main.append(Nav(), Content());
  
  return main;
}