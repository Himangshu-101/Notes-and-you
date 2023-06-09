const express = require('express');
const router = express.Router();
var fetchUser = require('./middleware/fetchUser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//Route 1 : Get all the notes using : GET "/api/notes/getuser". Login required

router.get('/fetchallnotes', fetchUser, async (req, res) => {

    const notes = await Notes.find({user: req.user.id});
    res.json(notes)
})


//Route 2 : Post your notes using : POST "/api/notes/addnotes". Login required

router.post('/addnotes', fetchUser, [
    body('title', 'Enter a valid title').isLength({min : 5}),
    body('description', 'Provide a suitable description').isLength({min : 5})
], async (req, res) => {

    //If there are errors, return bad request and the errors    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try{
        const {title, description, tag} = req.body;

        const note = new Notes ({
            title,
            description,
            tag,
            user: req.user.id
        })

        const savedNote = await note.save();
        res.json(savedNote)
    }

    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

module.exports = router