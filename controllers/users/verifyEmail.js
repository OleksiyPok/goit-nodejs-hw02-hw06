const appRoot = process.cwd();

const { User } = require(appRoot + "/models");
console.log("User:", User);
const createError = require("http-errors");
const { errorWrapper } = require(appRoot + "/helpers");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw createError(401, `User has not been found`);
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  res.status(200).json({
    message: `Email of user ${user.name} has been verified`,
  });
};
module.exports = errorWrapper(verifyEmail);
