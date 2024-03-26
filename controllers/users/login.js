const appRoot = process.cwd();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const { errorWrapper } = require(appRoot + "/helpers");

const { User } = require(appRoot + "/models");

const { JWT_SECRET } = process.env;

const login = async (req, res) => {
  const { password } = req.body;
  const email = req.body.email.toLowerCase();
  const user = await User.findOne({ email }).exec();

  if (user === null) {
    throw createError(401, `Email or password is incorrect`);
  }

  if (!user.verify) {
    throw createError(403, `Email has not been verified`);
  }

  const token = jwt.sign({ id: user._id, name: user.name }, JWT_SECRET, {
    expiresIn: "24h",
  });

  const userIsMath = await bcrypt.compare(password, user.password);

  if (userIsMath === false) {
    throw createError(401, `Email or passwort is incorrect`);
  }

  const logUser = await User.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  ).exec();

  res.status(200).json({
    message: `User ${logUser.name} is login`,
    status: "success",
    code: 200,
    data: { name: logUser.name, email: logUser.email, token },
  });
};

module.exports = errorWrapper(login);
