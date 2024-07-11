const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const contactsData = await fs.readFile(contactsPath);
    const contacts = JSON.parse(contactsData);
    return contacts;
  } catch (err) {
    console.error('Error reading contacts in listContacts:', err);
    throw err;
  };
};

const getContactById = async (contactId) => {
  try{
    const contacts = await listContacts();
    const contact = contacts.find(contact => contact.id === contactId);
    return contact || null;
  } catch (err) {
    console.error('Error reading contacts in getContactById:', err);
    throw err;
  };
};

const removeContact = async (contactId) => {
  try {
    let contacts = await listContacts();
    contacts = contacts.filter(contact => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log(`Contact with id ${contactId} has been removed.`);
    return contacts;
  } catch (err) {
    console.error('Error removing contact in removeContact:', err);
    throw err;
  };
};

const addContact = async (body) => {
  try {
    let contacts = await listContacts();
    const newContact ={
      id: uuidv4(),
      ...body,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log(`Contact with id ${newContact.id} has been added.`);
    return newContact;
  } catch (err) {
    console.error('Error removing contact in addContact:', err);
    throw err;
  }
}

const updateContact = async (contactId, body) => {
    try {
      const contacts = await listContacts();
      const contactIndex = contacts.findIndex(contact => contact.id === contactId);
      const updatedContact = {
        ...contacts[contactIndex], 
        ...body };
      contacts[contactIndex] = updatedContact;
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      console.log(`Contact with id ${contactId} has been updated.`);
      return updatedContact;
    } catch (err) {
      console.error('Error removing contact in updateContact:', err);
      throw err;
    }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
