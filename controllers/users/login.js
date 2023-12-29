const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const { User } = require("../../models");

const { JWT_SECRET } = process.env;

const login = async (req, res) => {
  const { password } = req.body;
  const email = req.body.email.toLowerCase();
  const user = await User.findOne({ email }).exec();

  if (user === null) {
    throw createError(401, `Email or passwort is incorrect`);
  }

  const token = jwt.sign({ id: user._id, name: user.name }, JWT_SECRET, {
    expiresIn: "4h",
  });

  const userIsMath = await bcrypt.compare(password, user.password);

  if (userIsMath === false) {
    throw createError(401, `Email or passwort is incorrect`);
  }

  const updUser = await User.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  ).exec();

  res.status(200).json({
    status: "success",
    code: 200,
    data: { name: updUser.name, email: updUser.email, token },
  });
};

module.exports = login;
