const appRoot = process.cwd();
const bcrypt = require("bcrypt");
const createError = require("http-errors");

const { User } = require(appRoot + "/models");

const register = async (req, res) => {
  const { name, password } = req.body;
  const email = req.body.email.toLowerCase();

  const user = await User.findOne({ email }).exec();

  if (user !== null) {
    throw createError(
      409,
      `User with the same email already exist in the system (email: ${user.email}, name: ${user.name})`
      // "message": "Email in use"
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: passwordHash,
  });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      name,
      email,
      passwordHash,
    },
  });
};

module.exports = register;
