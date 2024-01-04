require("dotenv").config();
const sgMailService = require("@sendgrid/mail");

const { SENDGRID_USER, SENDGRID_API_KEY } = process.env;

// create default email header and body
const defaultEmail = {
  to: SENDGRID_USER,
  subject: "Test reply email",
  from: SENDGRID_USER,
  html: `Test reply email`,
};

// create connection configuration
sgMailService.setApiKey(SENDGRID_API_KEY);

// sending an email with the specified data
const sendEmail = async (data = {}) => {
  const email = { ...defaultEmail, ...data };
  await sgMailService.send(email);
};

const mailService = {
  sendEmail,
};

module.exports = mailService;
