const express = require('express');
const router = express.Router();
const db = require('./data/db')

router.post("/posts", (req, res) => {
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


  router.get("/posts", (req, res) => {
    db.find()
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        res.status(500).json({ error: err, message: "Could not secure" });
      });
  });

  router.get("/posts/:id", (req, res) => {
    const postid = req.params.id;
    db.findById(postid)
      .then(id => {
        if (id) {
          res.status(200).json(findId);
        } else {
          res.status(404).json({ message: " No ID found" });
        }
      })
      .catch(err => {
        res.status(500).json({ error: err, message: "Could not secure" });
      });
  });




  router.delete("/posts/:id", (req, res) => {
    const postid = req.params.id;
    db.remove(postid)
    .then(post =>{
        if(post){
            db.remove(postid).then(removepost => {
                res.status(201).json(removepost);
            });
        } else{
            res.status(404).json({
                error:err,
                message:"The user with specified ID does no exist"

            })
        }
    })
    .catch(error => {
        res.status(500).json({ message: "The user could not be removed" });
    })
});


router.post("/posts/:id/comments", (req, res) => {
    req.body.post_id = req.params.id;
    if (!req.body.text) {
       res.status(400).json({ errorMessage: "Please provide title and contents for the posts." })  
    }
    db.insertComment(req.body)
    .then(post =>{
        if(post){
            res.status(201).json({ post})
        } else{
            res.status(404).json({
                error:err,
                message:"The user with specified ID does no exist"

            })
        }
    })

    .catch(error => { 
        res.status(500).json({ error: "There was an error while saving the comment to the database" });
    })
});

router.get("/posts/:id/comments", (req, res) => {
   
    db.findCommentById(req.params.id)
    .then(post =>{
        if(post){
            res.status(201).json({ post})
        } else{
            res.status(404).json({
                error:err,
                message: "The post with the specified ID does not exist." 

            })
        }
    })

    .catch(error => { 
        res.status(500).json({ error: "The comments information could not be retrieved."});
    })
});



router.put("/posts/:id", (req, res) => {
    const { title, contents } = req.body;
    const postId = req.params.id;
    
    db.update(postId, { title, contents })
      .then(posts => {
        if (posts) {
          db.findById(postId).then(updatepost => {
            res.status(201).json(updatepost);
          });
        } else {
          res.status(404).json({ message: "The post with the specified ID does not exist."  });
        }
      })
      .catch(err => {
        res.status(500).json({  error: "The post information could not be modified."});
      });
  });

  module.exports = router 

