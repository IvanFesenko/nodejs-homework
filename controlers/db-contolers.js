const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "..", "./db/contacts.json");

async function readData() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data.toString());
  } catch (error) {
    throw error;
  }
}

async function writeData(data) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  } catch (error) {
    throw error;
  }
}

module.exports = { readData, writeData };
