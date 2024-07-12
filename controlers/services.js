const Contact = require('../models/contacts.js')

const fetchContacts = async () => {
    return await Contact.find();
};

const fetchContact = () => {

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