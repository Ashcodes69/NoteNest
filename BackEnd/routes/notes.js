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
    res.status(500).send("Enternal server Error in getting your data");
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
      res.status(500).send("Enternal server Error in saving your notes");
    }
  }
);
module.exports = router;
