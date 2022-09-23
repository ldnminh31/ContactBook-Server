const knex = require("../database/knex");

class ContactService {
  constructor() {
    this.contacts = knex("contacts");
  }
  // define methods for accessing the database

  #getContact(payload) {
    const contact = { ...payload };
    const contactProperties = ["name", "email", "address", "phone", "favorite"];
    // remove non-contacts properties
    Object.keys(contact).forEach(function (key) {
      if (contactProperties.indexOf(key) == -1) {
        delete contact[key];
      }
    });
    return contact;
  }
  async create(payload) {
    const contact = this.#getContact(payload);
    const [id] = await this.contacts.insert(contact);
    return { id, ...contact };
  }
}
module.exports = ContactService;
