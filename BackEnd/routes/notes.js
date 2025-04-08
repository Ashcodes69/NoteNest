const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

// ROUTE-1 Get all notes of a user using GET request "?api/auth/fetchAllNotes" --- login required

router.get("/fetchAllNotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server Error in getting your data");
  }
});

// ROUTE-2 Add notes using POST request "?api/auth/addNotes" --- login required

router.post(
  "/addNotes",
  fetchUser,
  [
    // ensuring that user must enter a valid title and description using --- express-validator

    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 8 }),
  ],

  async (req, res) => {
    const { title, description, tag } = req.body;

    //if there are errors sent bad request and errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNotes = await notes.save();
      res.json(saveNotes);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error in saving your notes");
    }
  }
);

// ROUTE-3 Update an existing note using PUT request "?api/auth/updateNotes" --- login required

router.put(
  "/updateNotes/:id",
  fetchUser,
  [
    // ensuring that user must enter a valid title and description using --- express-validator

    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;

    // creating a newNote object
    try {
      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }

      //find the note to be updated and update it

      let note = await Notes.findById(req.params.id);
      if (!note) return res.status(404).send("not found");
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("not allowed");
      }
      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.send(note);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error in updating your notes");
    }
  }
);

// ROUTE-3 Delete an existing note using DElETE request "?api/auth/deleteNotes" --- login required

router.delete(
  "/deleteNotes/:id",
  fetchUser,
  async (req, res) => {
    //find the note to be Deleted and delete it
    try {
      let note = await Notes.findById(req.params.id);
      if (!note) return res.status(404).send("not found");

      //Alow deletion only if user owns this notes

      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("not allowed");
      }
      note = await Notes.findByIdAndDelete(req.params.id);
      res.json({ message: "Note is deleted", note });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error in deleting your notes");
    }
  }
);

module.exports = router;
