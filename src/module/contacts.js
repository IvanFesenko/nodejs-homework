import { handleError } from "../lib/handlerror.js";

export function listContacts() {
  fs.readFile(contactsPath, (error, data) => {
    handleError(error);
    console.group("<==== Contacts list ====>");
    console.table(JSON.parse(data.toString()));
    console.groupEnd();
  });
}

export function getContactById(contactId) {
  fs.readFile(contactsPath, (error, data) => {
    handleError(error);
    const contacts = JSON.parse(data.toString());
    const contact = contacts.find((contact) => contact.id === contactId);
    if (!contact)
      return console.error(`Contact with ID: ${contactId} not found!`);

    return console.table(contact);
  });
}

export function removeContact(contactId) {
  fs.readFile(contactsPath, (error, data) => {
    handleError(error);
    const contacts = JSON.parse(data.toString());
    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    if (contacts.length === newContacts.length) {
      return console.error(`Contact with ID: ${contactId} not found!`);
    }

    fs.writeFile(contactsPath, JSON.stringify(newContacts), (error) => {
      handleError(error);
      return console.log(`Contact was removed successfully`);
    });
  });
}

export function addContact(name, email, phone) {
  fs.readFile(contactsPath, (error, data) => {
    handleError(error);
    const contacts = JSON.parse(data.toString());
    const newContact = { id: shortid.generate(), name, email, phone };
    const newContacts = [...contacts, newContact];
    fs.writeFile(contactsPath, JSON.stringify(newContacts), (error) => {
      handleError(error);
      return console.log(`Contact was added successfully`);
    });
  });
}
