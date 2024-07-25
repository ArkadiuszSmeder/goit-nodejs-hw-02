const express = require('express');
const router = express.Router();
const { createUser, loginUser, logoutUser, getCurrentUser } = require('../../controlers/usersCtrl.js');
const authMiddleware = require('../../middleware/jwt.js');

router.post('/signup', createUser);

router.post('/login', loginUser);

router.get('/logout', authMiddleware, logoutUser);

router.get('/current', authMiddleware, getCurrentUser)

module.exports = router;