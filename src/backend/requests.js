const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  getOneTask,
  deleteOneTask,
  updateTask,
  addNewTask
} = require('./helpers');

router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getOneTask);
router.delete('/tasks/:id', deleteOneTask);
router.put('/tasks/:id', updateTask);
router.post('/tasks', addNewTask);

module.exports = router;