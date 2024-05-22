const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

let users = [];

// POST /users - to create a user
app.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).json(user);
});

// GET /users - to get all users
app.get('/users', (req, res) => {
    res.json(users);
});

// PUT /users/:id - to edit a user
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = req.body;
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
        users[index] = user;
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// DELETE /users/:id - to delete a user
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
        users.splice(index, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
