const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const updateSubscription = require("./updateSubscription");
const deleteUser = require("./deleteUser");

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
  deleteUser,
};
