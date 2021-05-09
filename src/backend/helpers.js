const client = require('./db.js').client;
const ObjectId  = require('mongodb').ObjectId;

async function getAllTasks(req, res) {
  await client.connect((err, client) => {
    const {
      q
    } = req.query;
    const db = client.db('todolist');
    db.collection('tasks').find({}).toArray( (err, result) => {
      
      if(q) {
        return res.json(result.filter(task => task.description.toLowerCase().includes(q.toLowerCase())));
      }

      res.json(result);
    });
  });
}

async function getOneTask(req, res) {
  await client.connect((err, client) => {
    const db = client.db('todolist');
    const { id } = req.params;
    db.collection('tasks').find({}).toArray((err, result) => {
      res.json(result.filter(elem => '' + elem['_id'] === id));
      console.log(result);
    });
  });
}

async function deleteOneTask(req, res) {
  await client.connect((err, client) => {
    const db = client.db('todolist');
    const { id } = req.params;
    const task = { _id: ObjectId(id)};
    db.collection('tasks').deleteOne(task, (err, result) => {
      res.status(201).json(task);
      console.log('1 task deleted');
    });
  });
}

async function updateTask(req,res) {
  await client.connect((err, client) => {
    const db = client.db('todolist');
    const { id } = req.params;
    const task = { _id: ObjectId(id)};
    const newValues = { $set: { ...changes} = req.body }
    db.collection('tasks').updateOne(task, newValues, (err, result) => {
      res.status(201).json(newValues);
    });
  });
}


async function addNewTask(req,res) {
  await client.connect((err, client) => {
    const db = client.db('todolist');
    const task = Object.assign({}, req.body, { dateOfCreate: Date.now(), isFinished: false})
    db.collection('tasks').insertOne(task, (err, result) => {
      res.status(201).json(task);
    });
  });
}

module.exports = {
  getAllTasks,
  getOneTask,
  deleteOneTask,
  updateTask,
  addNewTask
};