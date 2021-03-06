const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  deleteContactById,
  addContact,
  patchContactById,
  validation,
} = require("../controllers/contacts.js");

router.get("/", listContacts);
router.post("/", validation, addContact);
router.get("/:contactId", getContactById);
router.delete("/:contactId", deleteContactById);
router.patch("/:contactId", validation, patchContactById);

module.exports = router;
