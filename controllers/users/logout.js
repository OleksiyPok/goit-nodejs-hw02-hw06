const appRoot = process.cwd();
const { User } = require(appRoot + "/models");

const { errorWrapper } = require(appRoot + "/helpers");

const logout = async (req, res) => {
  const { id } = req.user;
  const outUser = await User.findByIdAndUpdate(id, {
    token: null,
  }).exec();
  res.status(204).send(`User ${outUser.name} is logout`);
};

module.exports = errorWrapper(logout);
