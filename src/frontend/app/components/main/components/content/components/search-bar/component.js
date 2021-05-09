import { TaskServices } from "../../../../../../services/task.service";
import { Row } from "../tasks";
import { SearchBar } from "./helpers";

import styles from './styles.module.scss';
import '../../../../../../styles.scss/dark-theme.scss';

export function SearchingPanel() {
  const div = document.createElement('div');
  div.classList.add(styles.searchingPanel);

  div.append(SearchBar(), Select());

  return div;
}

export function Select() {
  const select = document.createElement('select');
  select.className = ('form-select form-select-sm select');
  select.classList.add(styles.select);
  select.setAttribute('aria-label', `.form-select-sm example`);
  select.addEventListener('change', ShowTaskStatus);

  select.append(
    Option({
    atr: 'selected',
    value: '',
    content: 'Status(all tasks)'
    }), 
    Option({
    value: 'secondary',
    content: 'Secondary'
    }), 
    Option({
    value: 'important',
    content: 'Important'
    }), 
    Option({
    value: 'done',
    content: 'Done'
    }), 
  );
  return select;
}

export function Option({atr = 'value', value, content}) {
  const option = document.createElement('option');

  option.setAttribute(atr, value);
  option.textContent = content;

  return option;
}

function ShowTaskStatus(e) {
  document.querySelectorAll('li').forEach(elem => elem.classList.remove('click'));
  document.querySelector('thead').classList.remove('hide');
  
  const frImportant = document.createDocumentFragment();
  const frSecondary = document.createDocumentFragment();
  const frDone = document.createDocumentFragment();
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';
  const taskServise = new TaskServices();
  const taskStatusToFragmentMap = {
    important: frImportant,
    done: frDone,
    secondary: frSecondary
  };

  taskServise.getAllTasks().then(tasks => {
    tasks.forEach(task => {
      const row = Row({
        id: task._id,
        description: task.description,
        title: task.title,
        deadline: task.deadline,
        status: task.status,
        isFinished: task.isFinished
      });

      if(taskStatusToFragmentMap[task.status]) {
        taskStatusToFragmentMap[task.status].prepend(row);
      }
    })

    const status = document.querySelector('select')

    switch(status.value ) {
      case 'important': {
        tbody.append(frImportant);
        break;
      }

      case 'secondary': {
        tbody.append(frSecondary);
        break;
      }

      case 'done': {
        tbody.append(frDone);
        break;
      }

      default: tbody.append(frImportant, frSecondary, frDone);
    }
  })
}