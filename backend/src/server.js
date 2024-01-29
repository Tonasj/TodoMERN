const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const Todo = require('./models/Todo');

const app = express();

app.use(express.json());
app.use(cors());

const port = 4001;

const connectionString = 'mongodb://0.0.0.0:27017';

mongoose.connect(connectionString).then(() => console.log('Connected to database')).catch((err) => console.error(err));

app.get('/todo', async (req, res) => {
    const allTasks = await Todo.find();
    res.json(allTasks)
});

app.post('/todo/new', async (req, res) => {
    const newTask = await Todo.create(req.body);
    res.status(201).json({newTask});
});

app.delete('todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id)
    res.json(result);
});

app.listen(port, () => console.log(`listening on port ${port}`));