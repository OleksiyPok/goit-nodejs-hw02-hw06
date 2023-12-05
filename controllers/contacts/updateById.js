const createError = require("http-errors");

const productsOperations = require("../../models/contacts");
const contactsSchema = require("../../schemas/contacts");

const updateById = async (req, res, next) => {
  try {
    const validatedBody = contactsSchema.validate(req.body, {
      allowUnknown: false,
    });

    if (typeof validatedBody.error !== "undefined") {
      throw createError(400, validatedBody.error.details[0].message);
    }

    const { contactId } = req.params;
    const updatedContact = await productsOperations.updateContact(
      contactId,
      validatedBody.value
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
