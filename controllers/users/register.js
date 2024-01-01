const appRoot = process.cwd();
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const createError = require("http-errors");

const { errorWrapper } = require(appRoot + "/helpers");

const { User } = require(appRoot + "/models");

const register = async (req, res) => {
  const email = req.body.email.toLowerCase();
  const avatarUrl = gravatar.url(email);

  const user = await User.findOne({ email }).exec();

  if (user !== null) {
    throw createError(
      409,
      `User with the same email already exist in the system (email: ${user.email}, name: ${user.name})`
      // "message": "Email in use"
    );
  }

  const passwordHash = await bcrypt.hash(req.body.password, 10);

  const newUser = {
    ...req.body,
    email,
    password: passwordHash,
    avatar: avatarUrl,
  };

  await User.create(newUser);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      newUser,
    },
  });
};

module.exports = errorWrapper(register);
