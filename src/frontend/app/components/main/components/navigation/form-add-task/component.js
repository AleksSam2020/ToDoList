import { FormAddTaskClassName } from "./constans";
import { AddTask} from "./helpers";
import { Button } from "../../../../base/buttons";
import { Option } from "../../../../main/components/content/components/search-bar";
import $ from 'jquery';
import datepickerFactory from 'jquery-datepicker';
import datepickerJAFactory from 'jquery-datepicker/i18n/jquery.ui.datepicker-en-GB';

import './styles.scss';

export function FormAddTask() {
  const form = document.createElement('form');

  const titleInput = document.createElement('input');
  const descriptonTextarea = document.createElement('textarea');
  const dateInput = document.createElement('input');
  const select = SelectForForm();
  dateInput.setAttribute('type', 'text');
  dateInput.setAttribute('id', 'datepicker');
  
  datepickerFactory($);
  datepickerJAFactory($); 
    $(function(){
    $("#datepicker").datepicker({ dateFormat: 'MM dd, yy', minDate: 0 });
    $.datepicker.regional['en-GB'];
  });
  
  const btnAdd = Button({
    classList: 'btn btn-secondary',
    content: 'Add task',
    clickHandler: AddTask,
  });

  form.classList.add(FormAddTaskClassName);
  titleInput.classList.add('form-control', 'mb-3', 'title');
  descriptonTextarea.classList.add('form-control', 'mb-3');
  dateInput.classList.add('form-control', 'mb-3');

  titleInput.setAttribute('placeholder', 'Title...');
  descriptonTextarea.setAttribute('placeholder', 'Description...');
  dateInput.setAttribute('placeholder', 'Click to choose date...');
  dateInput.setAttribute('autocomplete', 'off');

  form.append(
    dateInput,
    titleInput,
    descriptonTextarea, 
    select,
    btnAdd,
  )

  return form;
}

export function removeDatepicker() {
  document.querySelector('#ui-datepicker-div')?.remove();
}

export function SelectForForm() {
  const select = document.createElement('select');
  select.className = ('form-select form-select-sm select');
  select.setAttribute('aria-label', `.form-select-sm example`);
  const statusOption = Option({ atr: 'selected',
    value: '',
    content: 'Status' })
    statusOption.setAttribute('disabled', '');

    select.append(statusOption,
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
