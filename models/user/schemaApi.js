const Joi = require("joi");
const { REGEX, commonConst } = require("../../constants");

const { userSubscription } = commonConst;

const userRegisterSchemaApi = Joi.object().keys({
  name: Joi.string().min(3).required(),
  email: Joi.string().pattern(REGEX.emailRegex),
  password: Joi.string().pattern(REGEX.passwordRegex),
});

const userLoginSchemaApi = Joi.object().keys({
  email: Joi.string().pattern(REGEX.emailRegex),
  password: Joi.string().pattern(REGEX.passwordRegex),
});

const userSubscriptionSchemaApi = Joi.object().keys({
  subscription: Joi.string()
    .valid(...userSubscription)
    .required(),
});

module.exports = {
  userRegisterSchemaApi,
  userLoginSchemaApi,
  userSubscriptionSchemaApi,
};
