const nanoid = require("nanoid");

const { readData, writeData } = require("./db-controllers.js");

function getServerError() {
  return {
    status: "fail",
    code: 500,
    message: "Something were wrong(",
    data: "Internal Server Error",
  };
}

async function listContacts(_req, res) {
  try {
    const contacts = await readData();
    res.json({
      status: "success",
      code: 200,
      data: contacts,
    });
  } catch (error) {
    const serverError = getServerError();
    res.json(serverError);
  }
}

async function getContactById(req, res) {
  try {
    const { contactId } = req.params;
    const contacts = await readData();
    const contact = contacts.find((contact) => contact.id === contactId);
    if (!contact) {
      return res.json({
        status: "not found",
        code: 404,
        message: "Contact not found",
        data: "Internal Server Error",
      });
    }
    res.json({
      status: "success",
      code: 200,
      data: contact,
    });
  } catch (error) {
    const serverError = getServerError();
    res.json(serverError);
  }
}

async function deleteContactById(req, res) {
  try {
    const { contactId } = req.params;
    const contacts = await readData();

    const newContacts = contacts.filter((contact) => contact.id !== contactId);
    if (contacts.length === newContacts.length) {
      return res.json({
        status: "not found",
        code: 404,
        message: "Contact not found",
        data: "Internal Server Error",
      });
    }
    await writeData(JSON.stringify(newContacts, null, 2));
    res.json({
      status: "success",
      code: 200,
      message: `Contact was with id: ${contactId} deleted`,
    });
  } catch (error) {
    const serverError = getServerError();
    res.json(serverError);
  }
}

async function addContact(req, res) {
  try {
    const { name, email, phone } = req.body;
    const contacts = await readData();
    const contact = { id: nanoid(), name, email, phone };
    const newContacts = [...contacts, contact];
    await writeData(JSON.stringify(newContacts, null, 2));
    res.json({
      status: "success",
      code: 201,
      data: contact,
    });
  } catch (error) {
    const serverError = getServerError();
    res.json(serverError);
  }
}

async function patchContactById(req, res) {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    if (!name?.email?.phone) {
      return res.json({
        status: "Update error",
        code: 400,
        message: "missing fields",
      });
    }

    const contacts = await readData();
    index = contacts.findIndex(({ id }) => id === contactId);
    modifiedContact = { id: contactId, name, email, phone };
    contacts[index] = modifiedContact;
    await writeData(JSON.stringify(contacts, null, 2));
    res.json({
      status: "success",
      code: 200,
      data: modifiedContact,
    });
  } catch (error) {
    const serverError = getServerError();
    res.json(serverError);
  }
}

module.exports = {
  listContacts,
  getContactById,
  deleteContactById,
  addContact,
  patchContactById,
};
