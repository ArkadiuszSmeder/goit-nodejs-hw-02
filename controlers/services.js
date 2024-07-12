const Contact = require('../models/contacts.js')

const fetchContacts = async () => {
    return await Contact.find();
};

const fetchContact = async (id) => {
    return Contact.findById({ _id: id });
};

const insertContact = ({ name, email, phone, favorite }) => {
    return Contact.create({
        name,
        email,
        phone,
        favorite
    })
};

const deleteContact = (id) => {
    return Contact.deleteOne({ _id: id });
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