const User = require("../models/user");
const bcrypt = require("bcrypt");
const uid2 = require("uid2");
const { checkBody } = require("../modules/checkBody");

// const getUsers = async (req, res) => {
//   const users = await User.find().select("-password");
//   res.json(users);
// };

// Controller pour l'inscription
const signupUser = async (req, res) => {
  try {
    // Vérifier Champ manquants
    if (!checkBody(req.body, ["username", "password", "email"])) {
      return res.json({ result: false, error: "Missing or empty fields" });
    }

    // Vérifier si l'utilisateur existe déjà (email insensitive)
    const existingUser = await User.findOne({ email: { $regex: new RegExp(req.body.email, "i") } });
    if (existingUser) {
      return res.json({ result: false, error: "User already exists" });
    }

    // Hasher le mot de passe
    const hash = await bcrypt.hash(req.body.password, 10);

    // Générer un token unique
    const token = uid2(32);

    // Créer l'utilisateur
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      token,
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
    res.json({ result: false, error: "Server error" });
  }
};
// Controller pour la connexion
const signinUser = async (req, res) => {
  try {
    if (!checkBody(req.body, ["username", "password"])) {
      return res.json({ result: false, error: "Missing or empty fields" });
    }

    const user = await User.findOne({ username: req.body.username });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      return res.json({ result: true, token: user.token });
    } else {
      return res.json({ result: false, error: "User not found or wrong password" });
    };

  } catch (error) {
    console.error(error);
    res.json({ result: false, error: "Server error" });
  }
};
// Controller pour obtenir le profil
const getProfile = async (req, res) => {
  try {
        // req.user provient du middleware auth
    res.json({ result: true, user: req.user });

  } catch (error) {
    console.error(error);
    res.json({ result: false, error: "Server error" });
  }
};
// Controller pour supprimer le profil
const deleteUser = async (req, res) => {
    try {
    await User.deleteOne({ _id: req.user._id });
    res.json({ result: true, message: "User deleted successfully" });

  } catch (error) {
    console.error(error);
    res.json({ result: false, error: "Server error" });
  }
}
// Controller updateProfile 
const updateProfile = async (req, res) => {
  try {
    
    const { username, password, profilePicture } = req.body;

    if (username) req.user.username = username;
    if (password) req.user.password = await bcrypt.hash(password, 10);
    if (profilePicture) req.user.profilePicture = profilePicture;

    const updatedUser = await req.user.save();
    res.json({ result: true, user: updatedUser });

  } catch (error) {
    console.error(error);
    res.json({ result: false, error: "Server error" });
  }
}

module.exports = {
  signupUser,
  signinUser,
  getProfile,
  deleteUser,
  updateProfile
};

