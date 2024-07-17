const express = require('express');
const router = express.Router();


router.post('/signup', createUser);

router.post('/login', loginUser);

module.exports = router;