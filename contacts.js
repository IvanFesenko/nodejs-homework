const fs = require("fs");
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      console.error(error.message);
      throw error;
    }
    console.group("<==== Contacts list ====>");
    console.table(JSON.parse(data.toString()));
    console.groupEnd();
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      console.error(error.message);
      throw error;
    }
    const contacts = JSON.parse(data.toString());
    const contact = contacts.find((contact) => contact.id === contactId);
    if (!contact)
      return console.error(`Contact with ID: ${contactId} not found!`);

    return console.table(contact);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      console.error(error.message);
      throw error;
    }
    const contacts = JSON.parse(data.toString());
    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    if (contacts.length === newContacts.length) {
      return console.error(`Contact with ID: ${contactId} not found!`);
    }

    fs.writeFile(contactsPath, JSON.stringify(newContacts), (error) => {
      if (error) throw error;
      return console.log(`Contact was removed successfully`);
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (error, data) => {
    if (error) {
      console.error(error.message);
      throw error;
    }
    const contacts = JSON.parse(data.toString());
    const newContact = { id: shortid.generate(), name, email, phone };
    const newContacts = [...contacts, newContact];
    fs.writeFile(contactsPath, JSON.stringify(newContacts), (error) => {
      if (error) throw error;
      return console.log(`Contact was added successfully`);
    });
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
