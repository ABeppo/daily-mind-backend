const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    token:{
        type: String,
        required: true
    },

    profilePicture: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

// Méthode toJSON pour exclure le mot de passe à chaque réponse JSON
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;