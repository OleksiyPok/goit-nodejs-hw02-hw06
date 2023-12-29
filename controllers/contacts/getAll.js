const appRoot = process.cwd();
const { Contact } = require(appRoot + "/models");

const { errorWrapper } = require(appRoot + "/helpers");

const getAll = async (req, res) => {
  const list = await Contact.find({});
  res.status(200).json({
    status: "success",
    code: 200,
    data: list,
  });
};

module.exports = errorWrapper(getAll);
