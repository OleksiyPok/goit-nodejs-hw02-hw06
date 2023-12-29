// const {
//   User,
//   userRegisterSchemaApi,
//   userLoginSchemaApi,
//   userSubscriptionSchemaApi,
// } = require("./user");

const User = require("./user");

const {
  userRegisterSchemaApi,
  userLoginSchemaApi,
  userSubscriptionSchemaApi,
} = require("./schemaApi");

module.exports = {
  User,
  userRegisterSchemaApi,
  userLoginSchemaApi,
  userSubscriptionSchemaApi,
};
