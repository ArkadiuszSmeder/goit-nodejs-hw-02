const express = require('express');
const router = express.Router();
const { listContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact } = require('../../controlers/index.js');
const authMiddleware = require('../../middleware/jwt.js');

router.get('/', authMiddleware, listContacts);

router.get('/:contactId', authMiddleware, getContactById);

router.post('/', authMiddleware, addContact);

router.delete('/:contactId', authMiddleware, removeContact);

router.put('/:contactId', authMiddleware, updateContact);

router.patch('/:contactId/favorite', authMiddleware, updateStatusContact)

module.exports = router;
