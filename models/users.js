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
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: {
      type: String,
      default: null,
    },
  });

userSchema.methods.setPassword = async function(password) {
  this.password = await bCrypt.hash(password, 10);
}

const User = mongoose.model('user', userSchema, 'users');

module.exports = User;