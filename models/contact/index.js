const Contact = require("./contact");
const schemaApi = require("./schemaApi");

const contactModel = { Contact, ...schemaApi };

module.exports = contactModel;
