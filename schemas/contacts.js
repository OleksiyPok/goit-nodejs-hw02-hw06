const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  number: Joi.number().required(),
});

module.exports = contactsSchema;
