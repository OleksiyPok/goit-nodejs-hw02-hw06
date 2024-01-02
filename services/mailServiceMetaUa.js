const nodemailer = require("nodemailer");
require("dotenv").config();

const { METAUA_MAIL_USER, METAUA_SMTP_PASSWORD } = process.env;

// create default email header and body
const defaultEmail = {
  to: METAUA_MAIL_USER,
  subject: "Test reply email",
  from: METAUA_MAIL_USER,
  html: `Test reply email`,
};

// create connection configuration
const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: METAUA_MAIL_USER,
    pass: METAUA_SMTP_PASSWORD,
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

  try {
    const info = await transporter.sendMail(email);
    return true;
  } catch (error) {
    throw error;
  }
};

const mailService = {
  verifyConnection,
  sendEmail,
};

module.exports = mailService;
