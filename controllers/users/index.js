const register = require("./register");
const verifyEmail = require("./verifyEmail");
const resendEmail = require("./resendEmail");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const updateAvatar = require("./updateAvatar");
const updateSubscription = require("./updateSubscription");
const deleteUser = require("./deleteUser");

module.exports = {
  register,
  verifyEmail,
  resendEmail,
  login,
  logout,
  getCurrent,
  updateAvatar,
  updateSubscription,
  deleteUser,
};
