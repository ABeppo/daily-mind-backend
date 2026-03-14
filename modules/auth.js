const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.json({ result: false, error: "No token provided" });
    }
    
    const user = await User.findOne({ token });

    if (!user) {
      return res.json({ result: false, error: "User not found" });
    }

    // On stocke l’utilisateur pour l’utiliser ensuite dans le controller
    req.user = user;

    next(); // passe à la route suivante
  } catch (error) {
    console.error(error);
    res.json({ result: false, error: "Server error" });
  }
};

module.exports = auth;