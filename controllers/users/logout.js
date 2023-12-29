const { User } = require("../../models");

const logout = async (req, res) => {
  const { id } = req.user;
  const outUser = await User.findByIdAndUpdate(id, {
    token: null,
  }).exec();
  res.status(204).send(`User ${outUser.name} is logout`);
};

module.exports = logout;
