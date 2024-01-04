const User = require("./user");
const schemaApi = require("./schemaApi");

const userModel = { User, ...schemaApi };

module.exports = userModel;
