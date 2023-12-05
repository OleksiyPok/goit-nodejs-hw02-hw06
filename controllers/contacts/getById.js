const createError = require("http-errors");

const productsOperations = require("../../models/contacts");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await productsOperations.getContactById(contactId);

    if (contact === null) {
      throw createError(
        404,
        `The requested contact has not been found (id: ${contactId})`
      );
    }

    res.status(200).json({
      status: "success",
      code: 200,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
