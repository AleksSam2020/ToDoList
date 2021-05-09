import { FormEditTaskClassName } from "./constans";
import { Button } from "../../../../base/buttons";
import { Modal } from "../../../../base/modal";
import { saveTask } from "./helpers";
import { fetchWithLoader } from "../../../../base/helpers";
import {SelectForForm} from '../form-add-task/component'
import $ from 'jquery';
import datepickerFactory from 'jquery-datepicker';
import datepickerJAFactory from 'jquery-datepicker/i18n/jquery.ui.datepicker-en-GB';

import '../form-add-task/styles.scss';
import { TaskServices } from "../../../../../services/task.service";

export function FormEditTask() {
  const form = document.createElement('form');
  form.classList.add(FormEditTaskClassName);
  const titleInput = document.createElement('input');
  const descriptonTextarea = document.createElement('textarea');
  const dateInput = document.createElement('input');
  const statusSelect = SelectForForm();
  dateInput.setAttribute('type', 'text');
  dateInput.setAttribute('id', 'datepicker');
  
  datepickerFactory($);
  datepickerJAFactory($);
    $(function(){
    $("#datepicker").datepicker({ dateFormat: 'MM dd, yy',  minDate: 0  });
    $.datepicker.regional['en-GB'];
  })

  const btnEdit = Button({
    classList: 'btn btn-secondary',
    content: 'Save',
    type: 'submit'
  });

  btnEdit.style.marginTop = '4%';
  
  form.addEventListener('submit', saveTask);
  titleInput.classList.add('form-control', 'mb-3');
  descriptonTextarea.classList.add('form-control', 'mb-3');

  titleInput.setAttribute('name', 'title');
  descriptonTextarea.setAttribute('name', 'description');
  titleInput.setAttribute('autocomplete', 'off');
  descriptonTextarea.setAttribute('autocomplete', 'off');
  dateInput.setAttribute('name', 'deadline');
  dateInput.setAttribute('autocomplete', 'off');
  dateInput.classList.add('form-control', 'mb-3');
  statusSelect.setAttribute('name', 'status');

  form.append(
    dateInput,
    titleInput,
    descriptonTextarea,
    statusSelect,
    btnEdit
  )

  return form;
}

export function EditTask(e) {
  e.preventDefault();
  const taskId = e.target.dataset.id;

  const taskService = new TaskServices();

  taskService.getTaskById(taskId)
    .then(task => {
      const form = FormEditTask();
      form.setAttribute('data-id', taskId);

      document.body.append(Modal({
        title: `"${task[0].title}"`,
        body: form
      }));

      const titleEl = form.elements.title;
      const descriptionEl = form.elements.description;
      const deadlineEl = form.elements.deadline;
      const statusEl = form.elements.status;
      
      titleEl.value = task[0].title;
      descriptionEl.value = task[0].description;
      deadlineEl.value = task[0].deadline;
      statusEl.value = task[0].status;
  }) 
}

