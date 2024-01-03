const appRoot = process.cwd();
const { errorWrapper } = require(appRoot + "/helpers");

const getCurrent = async (req, res) => {
  res.status(200).json({
    message: `Current user profile has been downloaded`,
    status: "success",
    code: 200,
    data: req.user,
  });
};

module.exports = errorWrapper(getCurrent);
