const Joi = require("joi");

const contactsSchema = Joi.object()
  .keys({
    name: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    phone: Joi.string(),
    number: Joi.string(),
  })
  .or("phone", "number")
  .required();

module.exports = contactsSchema;
