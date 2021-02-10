import * as fs from "fs/promises";
import * as path from "path";
import { handleError } from "../lib/handlerror.js";
import createDirname from "../lib/dirname.js";
import shortid from "shortid";

const { __dirname } = createDirname(import.meta.url);
const contactsPath = path.join(__dirname, "..", "..", "/db/contacts.json");

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    console.group("<==== Contacts list ====>");
    console.table(JSON.parse(data.toString()));
    console.groupEnd();
  } catch (error) {
    handleError(error);
  }
}

export async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data.toString());
    const contact = contacts.find((contact) => contact.id === contactId);
    if (!contact) console.error(`Contact with ID: ${contactId} not found!`);
    console.table(contact);
  } catch (error) {
    handleError(error);
  }
}

export async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data.toString());
    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    if (contacts.length === newContacts.length) {
      return console.error(`Contact with ID: ${contactId} not found!`);
    }
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    console.log(`Contact was removed successfully`);
  } catch (error) {
    handleError(error);
  }
}

export async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data.toString());
    const newContact = { id: shortid.generate(), name, email, phone };
    const newContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));

    console.log(`Contact was added successfully`);
  } catch (error) {
    handleError(error);
  }
}
