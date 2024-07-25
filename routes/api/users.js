const express = require('express');
const router = express.Router();
const { createUser, loginUser, logoutUser, getCurrentUser, updateAvatar } = require('../../controlers/usersCtrl.js');
const authMiddleware = require('../../middleware/jwt.js');
const uploadMiddleware = require('../../middleware/uploadMiddleware.js')

router.post('/signup', createUser);

router.post('/login', loginUser);

router.get('/logout', authMiddleware, logoutUser);

router.get('/current', authMiddleware, getCurrentUser)

router.patch('/avatars', authMiddleware, uploadMiddleware.single('avatar'), updateAvatar);

module.exports = router;