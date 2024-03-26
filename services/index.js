const mailServiceGmail = require("./mailServiceGmail");
const mailServiceMailtrap = require("./mailServiceMailtrap");
// const mailServiceMetaUa = require("./mailServiceMetaUa");
const mailServiceUkrNet = require("./mailServiceUkrNet");
// const mailServiceSendgrid = require("./mailServiceSendgrid");

const dbUserServices = require("./dbUserServices");
const dbContactServices = require("./dbContactServices");

module.exports = {
  mailServiceGmail,
  mailServiceMailtrap,
  // mailServiceMetaUa,
  mailServiceUkrNet,
  // mailServiceSendgrid,

  // dbUserServices,
  dbContactServices,
};
