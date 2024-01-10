const express = require('express');
const router = express.Router();
const NotesDB = require('../model/Notes'); // Import your Notes model here

// Create a new note
router.post('/notes', async (req, res) => {
  try {
    const { user, text } = req.body;

    const newNote = new NotesDB({ user, text });
    await newNote.save();

    res.status(201).json({ message: 'Note created successfully', note: newNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get all notes
router.get('/notes', async (req, res) => {
  try {
    const notes = await NotesDB.find();

    res.status(200).json({ notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get a     note by ID
router.get('/notes/:id', async (req, res) => {
  try {
    const note = await NotesDB.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update a note by ID
router.put('/notes/:id', async (req, res) => {
  try {
    const { user, text } = req.body;

    const updatedNote = await NotesDB.findByIdAndUpdate(
      req.params.id,
      { user, text },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ message: 'Note updated successfully', note: updatedNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a note by ID
router.delete('/notes/:id', async (req, res) => {
  try {
    const deletedNote = await NotesDB.findByIdAndDelete(req.params.id);

    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
