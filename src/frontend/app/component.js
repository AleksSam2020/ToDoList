import { Header } from './components/header';
import { Main } from './components/main';
import { Footer } from './components/footer';

import styles from './styles.module.scss'

export function App() {
  const app = document.createElement('div');

  app.classList.add(styles.layout);

  app.append(Header(), Main(), Footer());

  return app;
}