import { fetchWithLoader } from '../../../../../base/helpers';
import { CheckBox } from '../../../../../base/checkbox';
import { CreateIcon } from '../../../../../base/icons';
import { EditTask } from '../../../navigation/form-edit-task/component';
import { crossOver, Delete, Edit } from './helpers';

import styles from './styles.module.scss';

export function Table() {
  const table = document.createElement('table');
  table.classList.add('table', 'table-responsive', styles.table);

  if(localStorage.getItem('theme') === 'dark') {
    table.classList.add('table-striped', 'table-dark' );
  }

  if(localStorage.getItem('theme') === 'light') {
    table.classList.remove('table-striped', 'table-dark' );
  }

  table.append(THead(), Tasks());

  return table;
}

export function THead() {
  const tHead = document.createElement('thead');

  tHead.append(TrHead());

  return tHead;
}

export function TBody() {
  const tBody = document.createElement('tbody');

  tBody.classList.add('table-body');
  
  return tBody;
}

export function TrHead() {
  const trHead = document.createElement('tr');

  trHead.setAttribute('scope', 'col');

  trHead.append(createTh(), createTh('Title'), createTh('Description'), createTh('Deadline'), createTh('Status'), createTh(), createTh());

  return trHead;
}

export function createTh(content) {
  const th = document.createElement('th');

  th.textContent = content;

  return th;
}

export function createTd(content, id, e) {
  const td = document.createElement('td');
  td.setAttribute('data-id', id);
  td.addEventListener('dblclick', e);

  td.textContent = content;

  return td;
}

export function Row({
  id,
  description,
  title,
  deadline,
  status,
  isFinished = false
}) {
  const trBody = document.createElement('tr');
  const edit = createTd('', id);
  const del = createTd('', id);
  const check = createTd('', id);
  const statusTd = createTd(status, id, EditTask);
  const btnEdit = Edit();
  const btnDelete = Delete();
  const checkbox = CheckBox();
  const editIcon = CreateIcon('fas fa-pencil-alt')
  const delIcon = CreateIcon('far fa-trash-alt')

  trBody.setAttribute('data-id', id);
  btnEdit.setAttribute('data-id', id);
  btnDelete.setAttribute('data-id', id);
  checkbox.setAttribute('data-id', id);
  editIcon.setAttribute('data-id', id);
  delIcon.setAttribute('data-id', id);
  statusTd.setAttribute('value', status);

  btnEdit.append(editIcon);
  btnDelete.append(delIcon);
  check.append(checkbox)
  edit.append(btnEdit);
  del.append(btnDelete);

  checkbox.classList.add(styles.checkbox);
  checkbox.addEventListener('change', crossOver);

  if (isFinished || status === 'done') {
    trBody.classList.add('is-finished');
    checkbox.setAttribute('checked', '');
  } else {
    trBody.classList.remove('is-finished');
  }

  trBody.append(
    check,
    createTd(title, id, EditTask),
    createTd(description, id, EditTask),
    createTd(deadline, id, EditTask),
    statusTd,
    edit,
    del,
  )

  return trBody;
}

export function Tasks() {
  const fr = document.createDocumentFragment();
  const tbody = TBody();
  fetchWithLoader('http://localhost:3000/tasks')
    .then(res =>res.json())
    .then(tasks => {
      tasks.forEach(task => {
          fr.prepend(Row({
            id: task._id,
            description: task.description,
            title: task.title,
            deadline: task.deadline,
            status: task.status,
            isFinished: task.isFinished
          }))
      })
      tbody.prepend(fr);
    })

  return tbody;
}