const appRoot = process.cwd();
const Joi = require("joi");
const { REGEX } = require(appRoot + "/constants");

const contactSchemaApi = Joi.object().keys({
  name: Joi.string().min(3).required(),
  email: Joi.string().pattern(REGEX.emailRegex),
  phone: Joi.string().required(),
  favorite: Joi.bool().default(false),
});

const contactSchemaApiFavorite = Joi.object({
  favorite: Joi.bool().default(false).required(),
});

module.exports = {
  contactSchemaApi,
  contactSchemaApiFavorite,
};
