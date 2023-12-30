const appRoot = process.cwd();
const { errorWrapper } = require(appRoot + "/helpers");

const getCurrent = async (req, res) => {
  res.status(200).json({
    status: "success",
    code: 200,
    data: req.user,
  });
};

module.exports = errorWrapper(getCurrent);
