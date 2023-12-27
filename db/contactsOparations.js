const path = require("path");
const fs = require("fs").promises;
const crypto = require("node:crypto");

const CONTACTS_FILE_PATH = path.join(__dirname, "contacts.json");

// Read from file
async function read() {
  const data = await fs.readFile(CONTACTS_FILE_PATH, "utf-8");
  return JSON.parse(data);
}

// Write to file
function write(data) {
  return fs.writeFile(CONTACTS_FILE_PATH, JSON.stringify(data, null, 2));
}

const listContacts = async () => {
  const contacts = await read();
  return contacts;
};

const getContactById = async (contactId) => {
  const contactsList = await listContacts();
  const contact = contactsList.find((item) => item.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const addContact = async (body) => {
  const contactsList = await listContacts();
  const newId = crypto.randomUUID();
  const newContact = { ...body, id: newId };
  contactsList.push(newContact);
  write(contactsList);
  return newContact;
};

const removeContact = async (contactId) => {
  const contactsList = await listContacts();
  const idx = contactsList.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const deletedContact = contactsList.splice(idx, 1);
  write(contactsList);
  return deletedContact[0];
};

const updateContact = async (contactId, body) => {
  const contactsList = await listContacts();
  const idx = contactsList.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  contactsList[idx] = { id: contactId, ...body };
  write(contactsList);
  return contactsList[idx];
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
