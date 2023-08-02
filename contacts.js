const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "contacts.json");

async function read() {
  const books = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(books);
}

function write(data) {
  return fs.writeFile(contactsPath, JSON.stringify(data));
}

async function listContacts() {
  const contacts = await read();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await read();

  return contacts.find((contact) => contact.id === contactId);
}

async function removeContact(contactId) {
    const contacts = await read();

    const index = contacts.findIndex(contact => contact.id === contactId)
    if (index === -1) {
        return undefined
    }
    const newContact = [
        ...contacts.slice(0, index),
        ...contacts.slice(index + 1)
    ]

    await write(newContact);

    return contacts[index];
}

async function addContact(contact) {
  const contacts = await read();

  const newContact = { ...contact, id: crypto.randomUUID() };

  contacts.push(newContact);

  await write(contact);

  return newContact;
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}