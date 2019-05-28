const express = require('express');
const server = express();

const db = require('./data/db')

server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);


server.get("/", (req, res) => {
    db.find()
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        res.status(500).json({ error: err, message: "Could not secure" });
      });
  });