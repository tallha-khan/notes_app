const express = require("express");
const router = express.Router();

const Note = require("../models/Note");
const authMiddleware = require("../middleware/authMiddleware");

// ✅ GET /api/notes → Get all notes for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error("Error getting notes:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ POST /api/notes → Create new note
router.post("/", authMiddleware, async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content required" });
  }

  try {
    const newNote = new Note({
      user: req.userId,
      title,
      content,
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    console.error("Error creating note:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ DELETE /api/notes/:id → Delete a note
router.delete("/:id", authMiddleware, async (req, res) => {
  const noteId = req.params.id;

  try {
    const note = await Note.findOne({ _id: noteId, user: req.userId });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    await note.deleteOne();
    res.json({ message: "Note deleted" });
  } catch (err) {
    console.error("Error deleting note:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
