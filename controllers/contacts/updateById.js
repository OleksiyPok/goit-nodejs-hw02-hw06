const productsOperations = require("../../models/contacts");

const createError = require("http-errors");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await productsOperations.updateContact(
    contactId,
    req.body
  );

  if (updatedContact === null) {
    throw createError(
      404,
      `The requested contact has not been found (id: ${contactId})`
    );
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: updatedContact,
  });
};

module.exports = updateById;
