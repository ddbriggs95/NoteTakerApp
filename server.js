//dependency
const express = require('express');
const path = require('path');
const fs = require('fs');

//this is our importing of the db.json to hold our notes
var notes = require('./db.json');


const uuid = () => {
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

}


const PORT = 3001;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//get request for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
//get request for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//get request to read db.json file and return all saved notes as JSON
app.get('/api/notes', (req, res) => {

  console.info(`${req.method} request received to get notes`);

  //read db.json file
  let data = JSON.parse(fs.readFileSync('db.json', "utf-8"));
  console.log(JSON.stringify(data));
  res.json(data);

});

//receieves a new note, adds it to db.json, and then returns the new note
app.post('/api/notes', (req, res) => {

  let newNote = req.body;
  notes.push(newNote);
  fs.writeFile("db.json", JSON.stringify(notes, '\t'), err => {
    if (err) throw err;
    return true;
  })

});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
