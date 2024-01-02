const nodemailer = require("nodemailer");
require("dotenv").config();

const { GMAIL_MAIL_USER, GMAIL_SMTP_PASSWORD } = process.env;

// create default email header and body
const defaultEmail = {
  to: GMAIL_MAIL_USER,
  subject: "Test reply email",
  from: GMAIL_MAIL_USER,
  html: `Test reply email`,
};

// create connection configuration
const nodemailerConfig = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: GMAIL_MAIL_USER,
    pass: GMAIL_SMTP_PASSWORD,
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
