const express = require('express');
const router = express.Router();
const Joi = require('joi');
const contactsFunctions = require('../../models/contacts.js')

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[0-9\-+\s()]*$/).required()
})

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsFunctions.listContacts();
    res.json(contacts);
  } catch (err) {
    console.error(err);
    next(err);
  };
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await contactsFunctions.getContactById(contactId);
    if(!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (err) {
    console.error(err);
    next(err);
  };
})

router.post('/', async (req, res, next) => {
  const validateResult = contactSchema.validate(req.body)
  if (validateResult.error) {
      res.status(400).json({message: validateResult.error.message});
  } else {
      try {
        const newContact = await contactsFunctions.addContact(req.body);
        res.status(201).json(newContact);
      } catch (err) {
        console.error(err);
        next(err);
      };
  };
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const deletedContact = await contactsFunctions.removeContact(contactId);
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted successfully' })
  } catch (err) {
    console.error(err);
    next(err);
  };
});

router.put('/:contactId', async (req, res, next) => {
  const validateResult = contactSchema.validate(req.body)
  const { contactId } = req.params;
  if (validateResult.error) {
    res.status(400).json({message: validateResult.error.message});
  } else {
    try {
      const updatedContact = await contactsFunctions.updateContact(contactId, req.body);
      if (!updatedContact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.json(updatedContact);
    } catch (err) {
      console.error(err);
      next(err);
    };
  };
});

module.exports = router
