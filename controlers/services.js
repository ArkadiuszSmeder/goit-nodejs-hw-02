const Contact = require('../models/contacts.js');

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

const modernizeContact = ({ id, toUpdate, upsert }) => {
    return Contact.findByIdAndUpdate(
        { _id: id },
        { $set: toUpdate },
        { new: true, runValidators: true, strict: 'throw', upsert }
    );
};

const modernizeStatusContact = ({ id, toUpdate }) => {
    return Contact.findByIdAndUpdate(
        { _id: id },
        { $set: toUpdate },
        { new: true, runValidators: true, strict: 'throw' }
    );
};

module.exports = {
    fetchContacts,
    fetchContact,
    insertContact,
    deleteContact,
    modernizeContact,
    modernizeStatusContact
};