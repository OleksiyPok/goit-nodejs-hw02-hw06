const contactSchema = require("../models/schemas");
const createError = require("http-errors");

const contactValidation = (contactSchema) => {
  return (req, res, next) => {
    const { error } = contactSchema.validate(req.body, {
      allowUnknown: false,
    });

    if (error) {
      throw createError(400, error.details[0].message);
    }
    next();
  };
};

module.exports = contactValidation;
