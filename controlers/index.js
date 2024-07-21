const { fetchContacts, fetchContact, insertContact, deleteContact, modernizeContact, modernizeStatusContact } = require('./services.js');
const Joi = require('joi');

const contactJoiSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9\-+\s()]*$/).required(),
    favorite: Joi.boolean().required(),
    owner: Joi.string().required()
})

const listContacts = async (req, res, next) => {
    const owner = req.user._id;
    try {
        const contacts = await fetchContacts(owner);
        res.json(contacts);
    } catch (err) {
        console.log(err)
        next(err)
    }
};

const getContactById = async (req, res, next) => {
    const owner = req.user._id;
    try {
        const contactId = req.params.contactId
        const contact = await fetchContact(contactId, owner);
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
    const { name, email, phone, favorite, owner } = req.body;
    const validateResult = contactJoiSchema.validate(req.body);
    if (validateResult.error) {
       return res.status(400).json({message: validateResult.error.message});
    } else {
        try {
            const result = await insertContact({
                name,
                email,
                phone,
                favorite,
                owner
            })
            res.status(201).json(result);
        } catch (err) {
            next(err)
        }
    };
};

const removeContact = async (req, res, next) => {
    const owner = req.user._id;
    const { contactId } = req.params;
    try {
        await deleteContact(contactId, owner);
        res.status(204).send({ message: `Task ${contactId} has been removed` })
    } catch (err) {
        next (err)
    }
};

const updateContact = async (req, res, next) => {
    const owner = req.user._id;
    const { contactId } = req.params;
    const validateResult = contactJoiSchema.validate(req.body);
    if (validateResult.error) {
       return res.status(400).json({message: validateResult.error.message});
    } else {
        try {
            const result = await modernizeContact({ id: contactId, owner, toUpdate: req.body, upsert: true })
            res.json(result)
        } catch (err) {
            next(err)
        }
    }
};

const updateStatusContact = async (req, res, next) => {
    const owner = req.user._id;
    const { contactId } = req.params;
    const validateResult = contactJoiSchema.validate(req.body);
    if (validateResult.error) {
       return res.status(400).json({message: validateResult.error.message});
    } else {
        try {
            const result = await modernizeStatusContact({ id: contactId, owner, toUpdate: req.body });
            if (result) {
                res.status(200).json(result)
            } else {
                res.status(404).json({ message: 'Not found' })
            }
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
    updateContact,
    updateStatusContact
};