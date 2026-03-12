const User = require("../models/user");
const bcrypt = require("bcrypt");
const uid2 = require("uid2");


const getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

module.exports = { getUsers };


// Vérifie que les champs sont remplis
const checkBody = (body, requiredFields) => {
  return requiredFields.every(field => body[field] && body[field].trim() !== "");
};

// Controller pour l'inscription
const signupUser = async (req, res) => {
  try {
    if (!checkBody(req.body, ["username", "password", "email"])) {
      return res.json({ result: false, error: "Missing or empty fields" });
    }

    // Vérifie si l'utilisateur existe déjà (email insensitive)
    const existingUser = await User.findOne({ email: { $regex: new RegExp(req.body.email, "i") } });

    if (existingUser) {
      return res.json({ result: false, error: "User already exists" });
    }

    // Hash du mot de passe
    const hash = bcrypt.hashSync(req.body.password, 10);

    // Création du token
    const token = uid2(32);

    // Création du document utilisateur
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      token: token,
      profilePicture: ""
    });

    const savedUser = await newUser.save();

    res.json({
      result: true,
      token: savedUser.token,
      username: savedUser.username,
      profilePicture: savedUser.profilePicture,
      email: savedUser.email
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ result: false, error: "Server error" });
  }
};

module.exports = { signupUser };

