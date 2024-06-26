const appRoot = process.cwd();
const Joi = require("joi");
const { REGEX, commonConst } = require(appRoot + "/constants");

const { userSubscription } = commonConst;

const userRegisterSchemaApi = Joi.object().keys({
  name: Joi.string().min(3).required(),
  email: Joi.string().pattern(REGEX.emailRegex).required(),
  password: Joi.string().pattern(REGEX.passwordRegex).required(),
  subscription: Joi.string().valid(...userSubscription),
});

const userVerifyEmailSchemaApi = Joi.object().keys({
  email: Joi.string().pattern(REGEX.emailRegex).required(),
});

const userLoginSchemaApi = Joi.object().keys({
  email: Joi.string().pattern(REGEX.emailRegex).required(),
  password: Joi.string().pattern(REGEX.passwordRegex).required(),
});

const userSubscriptionSchemaApi = Joi.object().keys({
  subscription: Joi.string()
    .valid(...userSubscription)
    .required(),
});

module.exports = {
  userRegisterSchemaApi,
  userVerifyEmailSchemaApi,
  userLoginSchemaApi,
  userSubscriptionSchemaApi,
};
