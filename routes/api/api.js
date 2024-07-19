const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/jwt.js');

const contactsRoute = require('./contacts.js');
const usersRoute = require('./users.js');


router.use('/users', usersRoute);
router.use('/contacts', authMiddleware, contactsRoute);

module.exports = router;