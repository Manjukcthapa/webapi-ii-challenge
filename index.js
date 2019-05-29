const express = require('express');
const server = express();
server.use(express.json());

const db = require('./data/db')

server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);

server.post("/posts", (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post." 
      });
    } else {
      db.insert({ title, contents })
        .then(post => {
          res.status(201).json(post);
        })
        .catch(err => {
          res.status(500).json({
            error: err,
            message: "There was an error while saving the post to the database"
          });
        });
    }
  });


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


