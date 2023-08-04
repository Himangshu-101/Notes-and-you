const express = require('express');
const router = express.Router();
var fetchUser = require('./middleware/fetchUser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//Route 1 : Get all the notes using : GET "/api/notes/getuser". Login required

router.get('/fetchallnotes', fetchUser, async (req, res) => {

    const notes = await Notes.find({ user: req.user.id });
    res.json(notes)
})


//Route 2 : Post your notes using : POST "/api/notes/addnotes". Login required

router.post('/addnotes', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('description', 'Provide a suitable description').isLength({ min: 5 })
], async (req, res) => {

    //If there are errors, return bad request and the errors    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, tag } = req.body;

        const note = new Notes({
            title,
            description,
            tag,
            user: req.user.id
        })

        const savedNote = await note.save();
        res.json(savedNote)
    }

    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})


//Route 3 : Update your notes using : PUT "/api/notes/updatenotes". Login required  

router.put('/updatenotes/:id', fetchUser, async (req, res) => {

    const { title, description, tag } = req.body;

    // Create a new Note object
    try{

        const newNote = {};
        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;
    
        // Finding the note to be updated
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Note not found !") };
    
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed !");
        }
    
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
        
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})


//Route 4 : Delete your notes using : DELETE "/api/notes/deletenotes". Login required  

router.delete('/deletenotes/:id', fetchUser, async (req, res) => {

    try {
        
        // Finding the note to be deleted
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Note not found !") };
    
        // Allow deletion only if user owns this Note
    
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed !");
        }
    
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }


})

module.exports = router