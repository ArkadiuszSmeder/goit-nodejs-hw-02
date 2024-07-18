const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
    minLength: 2,
    maxLength: 30
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }
},
  {
    versionKey: false
});

const Contact = mongoose.model('contacts', contactSchema, 'contacts');

module.exports = Contact;