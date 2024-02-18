const nodemailer = require("nodemailer");
require("dotenv").config();

// const { GMAIL_MAIL_USER, GMAIL_SMTP_PASSWORD } = process.env;
const { MULTITRAP_MAIL_USER, MULTITRAP_SMTP_PASSWORD } = process.env;

// create default email header and body
const defaultEmail = {
  to: MULTITRAP_MAIL_USER,
  subject: "Test reply email",
  from: MULTITRAP_MAIL_USER,
  html: `Test reply email`,
};

// create connection configuration
const nodemailerConfig = {
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: MULTITRAP_MAIL_USER,
    pass: MULTITRAP_SMTP_PASSWORD,
  },
};

// create connection
const transporter = nodemailer.createTransport(nodemailerConfig);

// verify connection configuration
const verifyConnection = async (error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
};

// sending an email with the specified data
const sendEmail = async (data = {}) => {
  const email = { ...defaultEmail, ...data };
  await transporter.sendMail(email);
};

const mailService = {
  verifyConnection,
  sendEmail,
};

module.exports = mailService;
