const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "db", "contacts.json");
// const contactsPath = path.join(__dirname, "contacts.json");

// async function read() {
//   const contacts = await fs.readFile(contactsPath, "utf-8");
//   return JSON.parse(contacts);
// }

// function write(data) {
//   return fs.writeFile(contactsPath, JSON.stringify(data));
// }

async function listContacts() {
//   const contacts = await read();
//   return contacts;
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data)
    return contacts
}

async function getContactById(contactId) {
//   const contacts = await read();

//   return contacts.find((contact) => contact.id === contactId);
    const contacts = await listContacts();

    const result = contacts.find(contact => contact.id === contactId)

    if (!result) {
        return null
    }
    return result
}

async function removeContact(contactId) {
    // const contacts = await read();

    // const index = contacts.findIndex(contact => contact.id === contactId)
    // if (index === -1) {
    //     return undefined
    // }
    // const newContact = [
    //     ...contacts.slice(0, index),
    //     ...contacts.slice(index + 1)
    // ]

    // await write(newContact);

    // return contacts[index];

    const contacts = await listContacts()

    const index = contacts.findIndex(contact => contact.id === contactId)

    if (index === -1) {
        return null
    }

    const [result] = contacts.splice(index, 1)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return result
}

async function addContact(contact) {
//   const contacts = await read();

//   const newContact = { ...contact, id: crypto.randomUUID() };

//   contacts.push(newContact);

//   await write(contact);

//   return newContact;
    const contacts = await listContacts()

    const newContact = {
        id: crypto.randomUUID(),
        ...contact
    }

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
    return newContact
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}