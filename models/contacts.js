const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
    minLength: 2,
    maxLength: 25
  },
  email: {
    type: String,
    maxLength: 40
  },
  phone: {
    type: String,
    maxLength: 20
  },
  favorite: {
    type: Boolean,
    default: false,
},
},
  {
    versionKey: false
});

const Contact = mongoose.model('contacts', contactSchema, 'contacts');

module.exports = Contact;