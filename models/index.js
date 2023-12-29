const {
  User,
  userRegisterSchemaApi,
  userLoginSchemaApi,
  userSubscriptionSchemaApi,
} = require("./user");

const {
  Contact,
  contactSchemaApi,
  contactSchemaApiFavorite,
} = require("./contact");

module.exports = {
  User,
  userRegisterSchemaApi,
  userLoginSchemaApi,
  userSubscriptionSchemaApi,
  Contact,
  contactSchemaApi,
  contactSchemaApiFavorite,
};
