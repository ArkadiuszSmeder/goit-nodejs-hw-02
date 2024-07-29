const express = require('express');
const router = express.Router();
const { createUser, loginUser, logoutUser, getCurrentUser, updateAvatar, verifyUser } = require('../../controlers/usersCtrl.js');
const authMiddleware = require('../../middleware/jwt.js');
const multerMiddleware = require('../../config/multer.js');

router.post('/signup', createUser);

router.post('/login', loginUser);

router.get('/logout', authMiddleware, logoutUser);

router.get('/current', authMiddleware, getCurrentUser)

router.patch('/avatars', authMiddleware, multerMiddleware.single('avatar'), updateAvatar);

router.get('/verify/:verificationToken', verifyUser);

module.exports = router;