const express = require('express');
const router = express.Router();
const { listContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact } = require('../../controlers/index.js')

router.get('/', listContacts);

router.get('/:contactId', getContactById);

router.post('/', addContact);

router.delete('/:contactId', removeContact);

router.put('/:contactId', updateContact);

router.patch('/:contactId/favorite', updateStatusContact)

module.exports = router;
