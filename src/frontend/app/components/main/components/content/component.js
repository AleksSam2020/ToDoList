import { SearchingPanel } from "./components/search-bar";
import { Table } from './components/tasks/';

import styles from './styles.module.scss';


export function Content() {
  const content = document.createElement('section');

  content.classList.add(styles.section);

  content.append(SearchingPanel(), Table());

  return content;
}