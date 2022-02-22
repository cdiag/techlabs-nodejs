const express = require('express');
const {MongoClient, ObjectId} = require('mongodb')
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
app.use(cors())

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";
const dbName = process.env.DB_NAME || "exampleProject";
const dbHost = process.env.DB_HOST || "localhost";
const dbPort = process.env.DB_PORT || 27017;

const url = `mongodb://${dbHost}:${dbPort}`
const client = new MongoClient(url);
let database;
let collection;

app.use(bodyParser.json())
app.listen(port, async () => {
    console.log(`Example app listening at http://localhost:${port}`);

    await client.connect();
    console.log(`Connected to MongoDB at ${url}`);
    database = client.db(dbName);
    collection = database.collection('books');
});

// Hello World
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Read
app.get('/books', async (req, res) => {
    const results = await collection.find({}).toArray();
    res.send(results);
});

// Create
app.post('/books', async (req, res) => {
    const result = await collection.insertOne(req.body);
    res.status(201).send(result);
});

// Update
app.put('/books/:id', async (req, res) => {
    const results = await collection.updateOne({_id: new ObjectId(req.params.id)}, {$set: req.body})
    res.send(results);
});

// Delete
app.delete('/books/:id', async (req, res) => {
    const results = await collection.deleteOne({_id: new ObjectId(req.params.id)})
    res.send(results);
});


app.get('/books/:id', async (req, res) => {
    const results = await collection.find({_id: new ObjectId(req.params.id)}).toArray();
    res.send(results);
});
