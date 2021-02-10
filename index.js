import * as fs from "fs/promises";
import * as path from "path";
import { handleError } from "./src/lib/handlerror.js";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "./src/module/contacts.js";

import program from "./src/lib/commander.js";

const contactsPath = path.join(import.meta.url, "/db/contacts.json");

program.parse();
const options = program.opts();

console.log(options);

if (options?.add) {
  const { name, email, phone } = options;
  addContact(name, email, phone);
}
