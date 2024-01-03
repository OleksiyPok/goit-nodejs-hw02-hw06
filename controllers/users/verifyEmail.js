const appRoot = process.cwd();

const { User } = require(appRoot + "/models");
const createError = require("http-errors");
const { errorWrapper } = require(appRoot + "/helpers");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw createError(
      401,
      `User has not been found or email already has been verified`
    );
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.status(200).json({
    message: `Email ${user.email} has been verified`,
  });
};
module.exports = errorWrapper(verifyEmail);
