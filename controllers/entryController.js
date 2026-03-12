const Entry = require("./models/entry");

// Créer une entrée
const createEntry = async (req, res) => {
  const { userId, title, text, mood } = req.body;
  const entry = await Entry.create({ userId, title, text, mood });
  res.status(201).json(entry);
};

// Récupérer toutes les entrées d’un utilisateur
const getEntriesByUser = async (req, res) => {
  const entries = await Entry.find({ userId: req.params.userId }).sort({ createdAt: -1 });
  res.json(entries);
};

module.exports = { createEntry, getEntriesByUser };