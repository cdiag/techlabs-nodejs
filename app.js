const express = require('express');
const { MongoClient, ObjectId } = require('mongodb')
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url);
const dbName = "exampleProject";
let database;
let collection;

app.use(bodyParser.json())
app.listen(port, async() => {
  console.log(`Example app listening at http://localhost:${port}`);

  await client.connect();
  console.log(`Connected to MongoDB at ${url}`);
  database = client.db(dbName);
  collection = database.collection('books');
});


app.get('/', (req, res) => {
  res.send('Hello World!')
});

// Create
app.post('/books', async(req, res) => {
  const result = await collection.insertOne(req.body);
  res.status(201).send(result);
});

// Read
app.get('/books', async(req, res) => { 
  const results = await collection.find({}).toArray();
  res.send(results);
});

app.get('/books/:id', async(req, res) => {
  const results = await collection.find({_id: new ObjectId(req.params.id)}).toArray();
  res.send(results);
});

// Update
app.put('/books/:id', async(req, res) => {
  const results = await collection.updateOne({_id: new ObjectId(req.params.id)}, { $set: req.body })
  res.send(results);
});

// Delete
app.delete('/books/:id', async(req, res) => {
  const results = await collection.deleteOne({_id: new ObjectId(req.params.id)})
  res.send(results);
});
