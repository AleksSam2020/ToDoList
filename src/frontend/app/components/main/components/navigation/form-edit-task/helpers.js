import { TaskServices } from "../../../../../services/task.service";
import { ModalClose } from "../../../../base/modal/helpers";
import { removeToast, Toast } from "../../../../base/notification/component";
import { removeDatepicker } from "../form-add-task/component";

export function saveTask(e) {
  e.preventDefault();

  const form = e.target.closest('form');

  const {
    title: titleEl,
    description: descriptionEl,
    deadline: deadlineEl,
    status: statusEl
  } = form.elements;

  const taskId = e.target.dataset.id;
  const title = titleEl.value;
  const description = descriptionEl.value;
  const deadline = deadlineEl.value;
  const status = statusEl.value;

  const statusTd = document.querySelector( `tr td:nth-child(5)`);
  statusTd.setAttribute('value', status);

  const taskService = new TaskServices();

  taskService.putTask(taskId, {title, description, deadline, status})
    .then(task => {
      const title = document.querySelector( `tr[data-id = "${taskId}"] td:nth-child(2)`);
      const description = document.querySelector( `tr[data-id = "${taskId}"] td:nth-child(3)`);
      const deadline = document.querySelector( `tr[data-id = "${taskId}"] td:nth-child(4)`);
      const status = document.querySelector( `tr[data-id = "${taskId}"] td:nth-child(5)`);

      description.textContent = task['$set'].description;
      title.textContent = task['$set'].title;
      deadline.textContent = task['$set'].deadline;
      status.textContent = task['$set'].status;
      ModalClose();
      removeDatepicker();
      document.body.append(Toast('Task changed'));
      removeToast();
    })
}