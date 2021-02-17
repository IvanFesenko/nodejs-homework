const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  deleteContactById,
  addContact,
  patchContactById,
} = require("../controllers/contacts-controllers.js");

router.get("/", listContacts);
router.post("/", addContact);
router.get("/:contactId", getContactById);
router.delete("/:contactId", deleteContactById);
router.patch("/:contactId", patchContactById);

module.exports = router;
