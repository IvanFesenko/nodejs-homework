const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  deleteContactById,
  addContact,
} = require("../controlers/contacts-controlers.js");

router.get("/api/contacts", listContacts);
router.post("/api/contacts", addContact);
router.get("/api/contacts/:contactId", getContactById);
router.delete("/api/contacts/:contactId", deleteContactById);
router.path("/api/contacts/:contactId", patchContactById);
