import { TaskServices } from "../../../../../services/task.service";
import { ModalClose } from "../../../../base/modal/helpers";
import { removeToast, Toast } from "../../../../base/notification/component";
import { Row } from "../../content/components/tasks";
import { removeDatepicker } from "./component";
import { FormAddTaskSelector } from "./constans";

export function AddTask(e) {
  e.preventDefault();
  const form = document.querySelector(FormAddTaskSelector);
  const titleInput = form.querySelector('input.title');
  const descriptonTextarea = form.querySelector('textarea');
  const dateInput = form.querySelector('#datepicker');
  const statusSlect = form.querySelector('select');
  const title = titleInput.value;
  const description = descriptonTextarea.value;
  const deadline = dateInput.value;
  const status = statusSlect.value;

  const statusTd = document.querySelector( `tr td:nth-child(5)`);
  statusTd.setAttribute('value', status);

  const fr = document.createDocumentFragment();

  const taskService = new TaskServices();

  taskService.postTask({title, description, deadline, status})
    .then(task => {
      fr.prepend(Row({
        id: task._id,
        description: task.description,
        title: task.title,
        deadline: task.deadline,
        status: task.status,
        isFinished: task.isFinished
      }))
      
    document.querySelector('tBody').prepend(fr);
    ModalClose();
    removeDatepicker();
    document.querySelector('#root').append(Toast('New task added!'));
    removeToast();
  }) 
}