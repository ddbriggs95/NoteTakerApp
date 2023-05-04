//dependency
const express = require('express');
const path = require('path');
const fs = require('fs');

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

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
  




app.get('/api/notes', (req, res) => {
    // Send a message to the client
    res.status(200).json(`${req.method} request received to get notes`);
  
    // Log our request to the terminal
    console.info(`${req.method} request received to get notes`);
  });
  


// POST request to add a review
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add notes`);

  // Destructuring assignment for the items in req.body
  const { product, review, username } = req.body;

  // If all the required properties are present
  if (product && review && username) {
    // Variable for the object we will save
    const newReview = {
      product,
      review,
      username,
      review_id: uuid(),
    };
  };
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
