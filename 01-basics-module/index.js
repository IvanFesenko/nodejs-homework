import { handleError } from "./src/lib/handlerror.js";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./src/module/contacts.js";

import program from "./src/lib/commander.js";

program.parse();
const options = program.opts();

if (options?.list) {
  listContacts();
}

if (options?.get) {
  getContactById(Number(options.get));
}

if (options?.delete) {
  removeContact(Number(options.delete));
}

if (options?.add) {
  const { name, email, phone } = options;
  if (name && email && phone) addContact(name, email, phone);
}
