const express = require('express');
const router = express.Router();

const contactsRoute = require('./contacts.js');

router.use('/contacts', contactsRoute)

module.exports = router;