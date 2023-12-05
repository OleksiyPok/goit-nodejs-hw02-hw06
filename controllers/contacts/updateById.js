const createError = require("http-errors");

const productsOperations = require("../../models/contacts");

const updateById = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
