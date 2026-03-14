const Entry = require("../models/entry");


// CREATE ENTRY
const createEntry = async (req, res) => {
  try {
    const { title, text, mood } = req.body;

    if (!text || !mood) {
      return res.json({ result: false, error: "Missing required fields" });
    }

    const newEntry = new Entry({
      userId: req.user._id,
      title: title || "",
      text,
      mood
    });

    const savedEntry = await newEntry.save();
    res.json({ result: true, entry: savedEntry });

  } catch (error) {
    console.error(error);
    res.json({ result: false, error: "Server error" });
  }
};

// GET ALL ENTRIES OF USER
const getEntries = async (req, res) => {
  try {
    const entries = await Entry.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ result: true, entries });
  } catch (error) {
    console.error(error);
    res.json({ result: false, error: "Server error" });
  }
};

// GET SINGLE ENTRY BY ID
const getEntry = async (req, res) => {
  try {
    const entry = await Entry.findOne({ _id: req.params.id, userId: req.user._id });
    if (!entry) {
      return res.json({ result: false, error: "Entry not found" });
    }
    res.json({ result: true, entry });
  } catch (error) {
    console.error(error);
    res.json({ result: false, error: "Server error" });
  }
};

// UPDATE ENTRY
const updateEntry = async (req, res) => {
  try {
    const { title, text, mood } = req.body;

    const entry = await Entry.findOne({ _id: req.params.id, userId: req.user._id });
    if (!entry) {
      return res.json({ result: false, error: "Entry not found" });
    }

    if (title !== undefined) entry.title = title;
    if (text !== undefined) entry.text = text;
    if (mood !== undefined) entry.mood = mood;

    const updatedEntry = await entry.save();
    res.json({ result: true, entry: updatedEntry });

  } catch (error) {
    console.error(error);
    res.json({ result: false, error: "Server error" });
  }
};

// DELETE ENTRY
const deleteEntry = async (req, res) => {
  try {
    const entry = await Entry.findOne({ _id: req.params.id, userId: req.user._id });
    if (!entry) {
      return res.json({ result: false, error: "Entry not found" });
    }

    await Entry.deleteOne({ _id: entry._id });
    res.json({ result: true, message: "Entry deleted successfully" });

  } catch (error) {
    console.error(error);
    res.json({ result: false, error: "Server error" });
  }
};

// EXPORT

module.exports = {
  createEntry,
  getEntries,
  getEntry,
  updateEntry,
  deleteEntry
};

module.exports = { createEntry, getEntriesByUser };