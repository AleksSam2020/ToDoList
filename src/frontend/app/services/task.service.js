import { fetchWithLoader } from "../components/base/helpers";

export class TaskServices {
  getAllTasks(query) {
    const q = query ? `?q=${query}` : '' ;
    return  fetchWithLoader('http://localhost:3000/tasks' + q).then(res => res.json());
  }

  getTaskById(id) {
    return fetchWithLoader(`http://localhost:3000/tasks/${id}`).then(res => res.json());
  }

  postTask(task) {
    const t = {
      description: task.description,
      title: task.title,
      deadline: task.deadline,
      status: task.status,
    }

    return fetchWithLoader('http://localhost:3000/tasks', {
      method: 'POST',
      body: JSON.stringify(t),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json());
  }

  putTask(id, task) {
    const t = {
      description: task.description,
      title: task.title,
      deadline: task.deadline,
      status: task.status,
      isFinished: task.isFinished
    }
    return fetchWithLoader(`http://localhost:3000/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(t),
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json())
  }

  deleteTask(taskId) {
    return fetchWithLoader(`http://localhost:3000/tasks/${taskId}`, {
      method: 'DELETE',
    }).then(res => res.json())
  }
}