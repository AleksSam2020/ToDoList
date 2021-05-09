const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3000;
const server = express();
const taskRouter = require('./requests');

server.use(cors());
server.use(bodyParser.urlencoded({ extended: false}));
server.use(bodyParser.json());
server.use('/',  taskRouter);

function startServer() {
  try {
    server.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    })
  } catch(err) {
    console.log(err);
  }
}

startServer();

