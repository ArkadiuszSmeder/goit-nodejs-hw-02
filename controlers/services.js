const Contact = require('../models/contacts.js');

const fetchContacts = async (owner) => {
    return await Contact.find({ owner });
};

const fetchContact = async (id, owner) => {
    return Contact.findById({ _id: id, owner });
};

const insertContact = ({ name, email, phone, favorite, owner }) => {
    return Contact.create({
        name,
        email,
        phone,
        favorite,
        owner
    })
};

const deleteContact = (id, owner) => {
    return Contact.deleteOne({ _id: id, owner });
};

const modernizeContact = ({ id, owner, toUpdate, upsert }) => {
    return Contact.findByIdAndUpdate(
        { _id: id, owner },
        { $set: toUpdate },
        { new: true, runValidators: true, strict: 'throw', upsert }
    );
};

const modernizeStatusContact = ({ id, owner, toUpdate }) => {
    return Contact.findByIdAndUpdate(
        { _id: id, owner },
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