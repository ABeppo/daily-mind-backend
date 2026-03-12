var express = require('express');
var router = express.Router();
const User = require("../models/user")
const { signupUser } = require("../controllers/userController");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

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
});

module.exports = router;

router.post("/signup", signupUser);

module.exports = router;