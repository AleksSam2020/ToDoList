import { Button } from '../../../base/buttons';
import { CreateIcon } from '../../../base/icons';
import { Modal } from '../../../base/modal';
import { FormAddTask } from './form-add-task';
import { CreateList } from "./list";

import styles from './styles.module.scss';

export function Nav() {
  const nav = document.createElement('nav');

  nav.classList.add(styles.nav);
  
  const btnAdd = Button({
    classList: 'btn btn-secondary',
    content: 'Add task',
    clickHandler: AddTaskModal,
  });

  btnAdd.classList.add(styles.btn)
  btnAdd.append(CreateIcon('fas fa-plus'))

  nav.append(CreateList(), btnAdd);

  return nav;
}

function AddTaskModal() {
  const modal = Modal({
    body: FormAddTask()
  });

  document.body.append(modal) ;
}