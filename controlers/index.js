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