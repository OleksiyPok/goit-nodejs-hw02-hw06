const createError = require("http-errors");

const productsOperations = require("../../models/contacts");

const deleteById = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

module.exports = deleteById;
