const createError = require("http-errors");

const productsOperations = require("../../models/contacts");
const contactsSchema = require("../../schemas/contacts");

const addNew = async (req, res, next) => {
  try {
    const validatedBody = contactsSchema.validate(req.body, {
      allowUnknown: false,
    });

    if (typeof validatedBody.error !== "undefined") {
      throw createError(400, validatedBody.error.details[0].message);
    }

    const addedContact = await productsOperations.addContact(
      validatedBody.value
    );
    res.status(201).json({
      status: "success",
      code: 201,
      data: addedContact,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = addNew;
