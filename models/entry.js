const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      trim: true,
      maxlength: 100
    },

    text: {
      type: String,
      required: true,
      minlength: 3
    },

    mood: {
      type: String,
      enum: ["happy", "neutral", "sad", "angry", "tired"],
      required: true
    }
  },
  { timestamps: true }
);

const Entry = mongoose.model('Entry', EntrySchema);

module.exports = Entry;
