const { fetchContacts, fetchContact, insertContact, deleteContact, modernizeContact } = require('./services.js');
const Joi = require('joi');

const contactJoiSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9\-+\s()]*$/).required(),
    favorite: Joi.boolean().required()
  })

const listContacts = async (req, res, next) => {
    try {
        const contacts = await fetchContacts();
        res.json(contacts);
    } catch (err) {
        console.log(err)
        next(err)
    }
};

const getContactById = async (req, res, next) => {
    try {
        const contactId = req.params.contactId
        const contact = await fetchContact(contactId);
        if (contact) {
            res.json(contact);
        } else {
            next();
        };
    } catch (err) {
        next(err)
    };
};

const addContact = async (req, res, next) => {
    const { name, email, phone, favorite } = req.body;
    const validateResult = contactJoiSchema.validate(req.body);
    if (validateResult.error) {
        res.status(400).json({message: validateResult.error.message});
    } else {
        try {
            const result = await insertContact({
                name,
                email,
                phone,
                favorite
            })
            res.status(201).json(result);
        } catch (err) {
            next(err)
        }
    };
};

const removeContact = async (req, res, next) => {
    const { contactId } = req.params;

    try {
        await deleteContact(contactId);
        res.status(204).send({ message: `Task ${contactId} has been removed` })
    } catch (err) {
        next (err)
    }
};

const updateContact = async (req, res, next) => {
    const { contactId } = req.params;
    const validateResult = contactJoiSchema.validate(req.body);
    if (validateResult.error) {
        res.status(400).json({message: validateResult.error.message});
    } else {
        try {
            const result = await modernizeContact({ id: contactId, toUpdate: req.body, upsert: true })
            res.json(result)
        } catch (err) {
            next(err)
        }
    }
};

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact
};