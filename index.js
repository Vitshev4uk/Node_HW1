const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const argv = require("yargs").argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.table(allContacts);
      break;

    case "get":
      const contact = await getContactById(id);
      if (!contact) throw new Error(`Contact with id ${id} not found`);

      console.table(contact);
      break;

    case "add":
      const newContact = await addContact({ name, email, phone });
      console.table(newContact);
      break;

    case "remove":
      const deletedContact = await removeContact(id);
      console.table(deletedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);