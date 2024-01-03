const appRoot = process.cwd();
const { User } = require(appRoot + "/models");

const { errorWrapper } = require(appRoot + "/helpers");

const logout = async (req, res) => {
  const { id } = req.user;
  const outUser = await User.findByIdAndUpdate(id, {
    token: null,
  }).exec();
  res.status(204).json({
    message: `User ${outUser.name} is logout`,
    status: "success",
    code: 204,
  });
};

module.exports = errorWrapper(logout);
