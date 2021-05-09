const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://alex:alex@cluster0.5noqo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = {client};