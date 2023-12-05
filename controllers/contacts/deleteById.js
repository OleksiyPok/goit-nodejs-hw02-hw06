const productsOperations = require("../../models/contacts");

const createError = require("http-errors");

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const deletedContacts = await productsOperations.removeContact(contactId);

  if (deletedContacts === null) {
    throw createError(
      404,
      `The requested contact has not been found (id: ${contactId})`
    );
  }

  res.status(200).json({
    status: "success",
    code: 200,
    message: `Contact '${deletedContacts.name}' has been successfully deleted`,
    // data: deletedContacts,
  });
};

module.exports = deleteById;
