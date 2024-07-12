const { fetchContacts, fetchContact, insertContact, deleteContact, modernizeContact } = require('./services.js')

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
    
    try {
        const result = await modernizeContact({ id: contactId, toUpdate: req.body, upsert: true })
        res.json(result)
    } catch (err) {
        next(err)
    }
};

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact
};