// Require
const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = 3001;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));

// Routes
    // Get /api/notes
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        console.log(data);
    });
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});
    // Post /api/notes
    // delete api/notes/${id}

// Port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);