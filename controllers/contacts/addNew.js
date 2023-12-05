const createError = require("http-errors");

const productsOperations = require("../../models/contacts");
// const contactSchema = require("../../schemas");
// const contactSchema = require("../../schemas");

const addNew = async (req, res, next) => {
  try {
    const addedContact = await productsOperations.addContact(req.body);
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
