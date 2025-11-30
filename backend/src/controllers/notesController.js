import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  const user_id = req.user._id;
  try {
    const notes = await Note.find({ user_id }).sort({ updatedAt: -1 }); // Returns last updated notes first
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getNote(req, res) {
  const user_id = req.user._id;
  try {
    const note = await Note.findOne({ _id: req.params.id, user_id: user_id });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNote controller", error);
    if (error.name === "CastError") {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNote(req, res) {
  try {
    const user_id = req.user._id;
    const { title, content } = req.body;
    const newNote = new Note({ title, content, user_id });

    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
  const user_id = req.user._id;
  try {
    const { title, content } = req.body;

    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, user_id: user_id },
      { title, content },
      { new: true } // option to return the updated note
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNote controller", error);

    if (error.name === "CastError") {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteNote(req, res) {
  const user_id = req.user._id;
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      user_id: user_id,
    });

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    console.error("Error in deleteNote controller", error);

    if (error.name === "CastError") {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
}
