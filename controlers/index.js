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

};

const removeContact = async (req, res, next) => {

};

const updateContact = async (req, res, next) => {

};

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact
};