const express = require('express');
const router = express.Router();

const contactsRoute = require('./contacts.js');
const usersRoute = require('./users.js');

router.use('/contacts', contactsRoute);
router.use('/users', usersRoute);

module.exports = router;