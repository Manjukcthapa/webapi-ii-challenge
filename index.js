const express = require('express');
const server = express();

const db = require('./data/db')

server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);


server.get("/posts", (req, res) => {
    db.find()
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        res.status(500).json({ error: err, message: "Could not secure" });
      });
  });

  server.get("/posts/:id", (req, res) => {
    const postid = req.params.id;
    db.findById(postid)
      .then(id => {
        if (id) {
          db.findById(postid).then(findId => {
            res.status(200).json(findId);
          });
        } else {
          res.status(404).json({ message: " No ID found" });
        }
      })
      .catch(err => {
        res.status(500).json({ error: err, message: "Could not secure" });
      });
  });