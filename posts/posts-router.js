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
    .then( newPost => {
        console.log(newPost)
      if(req.body) {
        res.status(201).json(newPost)
      } else {
          res.status(400).json({ errorMessage: "Please provide a title and contents for the post."})
      }
    })
    .catch(error => {
        res.status(500).json({ message: "There was an error submitting your new post"})
    })
}) 
router.post('/:id/comments', (req, res) => { // creates a comment for the post with the specified id using information inside the req body

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
}) 
router.get('/:id/comments', (req,res) => {// returns an array of all the comments associated with a specific post

}) 
router.delete('/:id', (req,res) => {// removes the object with that id and then returns the deleted object

}) 
router.put('/:id', (req,res) => {// updates a post with a specific id using data from the req.body returns the modified document not the ORIGINAL

}) 




    
module.exports = router