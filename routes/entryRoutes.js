const express = require("express");
const router = express.Router();
const auth = require("../modules/auth");
const {
  createEntry,
  getEntries,
  getEntry,
  updateEntry,
  deleteEntry
} = require("../controllers/entryController");

// Routes sécurisées
router.post("/", auth, createEntry);          // Créer une entrée
router.get("/", auth, getEntries);           // Récupérer toutes les entrées de l'utilisateur
router.get("/:id", auth, getEntry);          // Récupérer une entrée par ID
router.put("/:id", auth, updateEntry);       // Modifier une entrée
router.delete("/:id", auth, deleteEntry);    // Supprimer une entrée

module.exports = router;