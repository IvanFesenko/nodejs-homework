const Contacts = require("../model/contacts.js");

const emailRegExp = require("../service/emailRegExp.js");
const phoneRegExp = require("../service/phoneRegExp.js");

function getServerError() {
  return {
    status: "fail",
    code: 500,
    message: "Something were wrong(",
    data: "Internal Server Error",
  };
}

async function addContact({ body }, res) {
  try {
    const contact = await Contacts.addContact(body);
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

async function listContacts(_req, res) {
  try {
    const contacts = await Contacts.listContacts();
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
    const contact = await Contacts.getContactById(contactId);
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

async function patchContactById({ body, params }, res) {
  try {
    const { contactId } = params;

    if (Object.keys(body).length === 0) {
      return res.json({
        status: "Update error",
        code: 400,
        message: "missing fields",
      });
    }
    const contact = await Contacts.updateContact(contactId, body);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: contact,
      });
    } else {
      return res.json({
        status: "not found",
        code: 404,
        message: "Contact not found",
      });
    }
  } catch (error) {
    const serverError = getServerError();
    res.json(serverError);
  }
}

async function deleteContactById({ params }, res) {
  try {
    const { contactId } = params;
    const contact = await Contacts.removeContact(contactId);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        message: `Contact was with id: ${contactId} deleted`,
      });
    } else {
      return res.json({
        status: "not found",
        code: 404,
        message: "Contact not found",
        data: "Internal Server Error",
      });
    }
  } catch (error) {
    const serverError = getServerError();
    res.json(serverError);
  }
}

function validation(req, res, next) {
  const validationRules = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email().min(5).max(30).pattern(emailRegExp),
    phone: Joi.string().min(3).max(30).pattern(phoneRegExp),
    password: Joi.string().min(7).max(15),
    subscription: Joi.string(),
  });

  const validationResult = validationRules.validate(req.body);

  if (validationResult.error) {
    return res.json({
      status: "Validation error",
      code: 400,
      message: validationResult.error,
    });
  }
  +next();
}

module.exports = {
  listContacts,
  getContactById,
  deleteContactById,
  addContact,
  patchContactById,
  validation,
};
