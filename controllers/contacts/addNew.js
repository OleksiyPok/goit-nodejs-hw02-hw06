const productsOperations = require("../../models/contacts");

const addNew = async (req, res) => {
  const addedContact = await productsOperations.addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: addedContact,
  });
};

module.exports = addNew;
