const contacts = require("./db/contacts");
// const contacts = require(".contacts");

contacts
  .listContacts()
  .then((contact) => console.log(contact))
  .catch((err) => console.log(err));
