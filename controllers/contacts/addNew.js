const contactsOperations = require("../../models/contacts");

const addNew = async (req, res) => {
  const addedContact = await contactsOperations.addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: addedContact,
  });
};

module.exports = addNew;
