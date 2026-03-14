var express = require('express');
var router = express.Router();
const User = require("../models/user")
const { signupUser, 
  getProfile, 
  updateProfile, 
  deleteUser, 
  signinUser} = require("../controllers/userController");
const auth = require("../modules/auth");

// GET users listing.
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
/* Test DB
router.get("/test-db", async (req, res) => {
  try {
    const testUser = new User({
      username: "testuser",
      email: "test@test.com",
      password: "123456",
      token: "testtoken123"
    });

    await testUser.save();

    res.json({
      message: "Utilisateur créé avec succès",
      user: testUser
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}); */

// Routes publiques
router.post("/signup", signupUser);
router.post("/signin", signinUser);

// Routes sécurisées
router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfile);
router.delete("/", auth, deleteUser);

module.exports = router;