const mongoose = require('mongoose');
const { Schema } = mongoose;
const bCrypt = require("bcrypt");

const userSchema = new Schema({
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    avatarURL: {
      type: String,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  });

userSchema.methods.setPassword = async function(password) {
  this.password = await bCrypt.hash(password, 10);
};

userSchema.methods.validatePassword = async function(password) {
  return await bCrypt.compare(password, this.password);
}

const User = mongoose.model('user', userSchema, 'users');

module.exports = User;