// Require
const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


const PORT = 3001;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));

// Routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

// Create Get /api/notes route
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        var newData = JSON.parse(data);
        res.json(newData);
    });
});

// Post /api/notes
app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        let notesDb = JSON.parse(data);
        let newNote = req.body;
        newNote.id = uuidv4();
        notesDb.push(newNote);
        console.log(notesDb);
        const allNotes = JSON.stringify(notesDb);
        fs.writeFile('./db/db.json', allNotes, (err) =>
        err
          ? console.error(err)
          : console.log(
              `New note has been added to the database.`
          )
        );
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// delete api/notes/${id}
// Read all notes from db.json
// Remove note with given id
// Rewrite notes to db.json

// Port
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);