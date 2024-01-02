const appRoot = process.cwd();

const { User } = require(appRoot + "/models");

const resendEmail = async (req, rs) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw createError(401, `User has not found`);
  }

  if (user.verify) {
    throw createError(401, `User already verified`);
  }

  // const verifyEmail = (){};
  // await sendEmail(verifyEmail);

  res.status(200).json({
    message: `Verification Email has been sent`,
  });
};
module.exports = resendEmail;
