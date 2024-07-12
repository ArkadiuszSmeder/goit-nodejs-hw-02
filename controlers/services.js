const Contact = require('../models/contacts.js')

const fetchContacts = async () => {
    return await Contact.find();
};

const fetchContact = async (id) => {
    return Contact.findById({ _id: id });
};

const insertContact = () => {

};

const deleteContact = () => {

};

const modernizeContact = () => {

};

module.exports = {
    fetchContacts,
    fetchContact,
    insertContact,
    deleteContact,
    modernizeContact
};