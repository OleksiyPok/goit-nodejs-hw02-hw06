const appRoot = process.cwd();

const { User } = require(appRoot + "/models");
// const { mailServiceGmail } = require(appRoot + "/services");
const { mailServiceUkrNet } = require(appRoot + "/services");

const createError = require("http-errors");
const { errorWrapper } = require(appRoot + "/helpers");

const resendEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw createError(401, `User has not been found`);
  }

  if (user.verify) {
    throw createError(400, `User already verified`);
  }

  const verificationEmail = {
    to: email,
    subject: "Confirmation of registration",
    html: `<a href="http://localhost:3001/api/users/verify/${user.verificationToken}" target="_blank">Click to confirm registration</a>`,
  };

  // await mailServiceGmail.sendEmail(verificationEmail);
  await mailServiceUkrNet.sendEmail(verificationEmail);

  res.status(200).json({
    message: `Verification Email has been sent`,
  });
};
module.exports = errorWrapper(resendEmail);
