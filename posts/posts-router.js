const express = require('express')
const db = require('../data/db')

const router = express.Router()

router.get('/', (req, res) => { // returns all contained in the Database
    db.find(req.query)
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error retrieving the posts'
        })
    })
})
router.post('/', (req,res) => {// create a post using req.body
    db.insert(req.body)
    .then( (newPostId) => {
      if(req.body.title && req.body.contents) {
        res.status(201).json(req.body)
      } else {
          res.status(400).json({ errorMessage: "Please provide a title and contents for the post."})
      }
    })
    .catch(error => {
        res.status(500).json({ message: "There was an error submitting your new post"})
    })
}) 
router.post('/:id/comments', (req, res) => { // creates a comment for the post with the specified id using information inside the req body
    const comment = req.body
        db.insertComment(comment)
        .then(newCommentId => {
            if(req.body.text){
                res.status(201).json(newCommentId)
            } else {
                res.status(400).json({message: "enter the text field in your comment"})
            }
        })
        .catch(err => {
            res.status(500).json({message: "there was an error while creating this comment"})
        })

    

})
router.get('/:id', (req,res) => {// return a post with a specific id
    db.findById(req.params.id)
    .then(post => { // returns post with that id.
        if(post) { // if post is true, display post
            res.status(200).json(post)
        } else {
            res.status(404).json({ message : "Post was not found"})
        }
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "There was an error finding the post"})
    })
}) 
router.get('/:id/comments', (req,res) => {// returns an array of all the comments associated with a specific post
    db.findCommentById(req.params.id)
    .then(comment => { // returns the comment with specific id
        if(comment){
        res.status(200).json(comment) 
        } else {
        res.status(404).json({ message: "cannot find the comment with that id"})
        }
    })
    .catch(err => {
        res.status(500).json({ message: "there was an error finding the comment"})
    })
}) 
router.delete('/:id', (req,res) => {// removes the object with that id and then returns the deleted object
    db.remove(req.params.id)
    .then(count => {
        if(count > 0){
            res.status(200).json({ message: 'the post has been removed'})
        }else {
            res.status(404).json({ message: 'the post with that id cannot be found' })
        }
    })
    .catch( err => {
        res.status(500).json({ message: 'Error removing the post'})
    })
}) 
router.put('/:id', (req,res) => {// updates a post with a specific id using data from the req.body returns the modified document not the ORIGINAL
    const changes = req.body
    db.update(req.params.id, changes)
    .then(count => {
        if(count > 0){
            res.status(200).json(changes)
        }else {
            res.status(404).json({message: "the post cannot be found"})
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'error while updating the post '})
    })
}) 




    
module.exports = router