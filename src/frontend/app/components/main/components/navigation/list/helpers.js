import { TaskServices } from '../../../../../services/task.service';
import { Row } from '../../content/components/tasks';
import styles from './styles.module.scss';

export function Li({content = '', clickEvent}) {
  const li = document.createElement('li');

  li.textContent = content;
  li.classList.add(styles.li);
  li.addEventListener('click', clickEvent);

  return li;
}

export function FilterTasksByDate(e) {
  document.querySelectorAll('li').forEach(elem => elem.classList.remove('click'));
  e.target.classList.add('click');

  const fr = document.createDocumentFragment();
  const tbody = document.querySelector('tbody');
  tbody.innerHTML= '';

  const thead = document.querySelector('thead');
  let div = document.createElement('div');
  div.textContent = 'There are no tasks for';
  
  const taskService = new TaskServices();
  taskService.getAllTasks().then((tasks) => {
    tasks.forEach((task) => {
      const todayWithoutTime = Date.parse(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
      const dateNow = Date.parse(new Date());
      const deadline = Date.parse(task.deadline);
      const row = Row({
          id: task._id,
          description: task.description,
          title: task.title,
          deadline: task.deadline,
          status: task.status,
          isFinished: task.isFinished
        })

      if(deadline === todayWithoutTime && e.target.outerText === 'Today') {
        fr.append(row);
      } else if(deadline > dateNow && deadline - dateNow <= 7*24*60*60*1000 && e.target.outerText === 'Week') {
        fr.append(row);
      } else if(deadline > dateNow && deadline - dateNow <= 30*24*60*60*1000 && e.target.outerText === 'Month') {
        fr.append(row);
      } else if (deadline > dateNow && deadline - dateNow <= 365*24*60*60*1000 && e.target.outerText === 'Year') {
        fr.append(row);
      } else if(e.target.outerText === 'All Tasks') {
        fr.prepend(row);
      }
    });
    tbody.append(fr);

    if(!tbody.childNodes.length) {
      thead.classList.add('hide');
      
      if(e.target.outerText === 'Today') {
        div = `${div.textContent} ${e.target.outerText}`;
      } else {
        div = `${div.textContent} a ${e.target.outerText}`;
      }

      tbody.append(div);
    }
  });

  div?.remove();
  thead.classList.remove('hide');
}