const userModel = require("./user");
const contactModel = require("./contact");

const models = { ...userModel, ...contactModel };

module.exports = models;
