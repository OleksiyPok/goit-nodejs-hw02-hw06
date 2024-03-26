const appRoot = process.cwd();

// const createError = require("http-errors");
const { errorWrapper } = require(appRoot + "/helpers");
const { dbContactServices } = require(appRoot + "/services");

const addNew = async (req, res) => {
  const addedContact = await dbContactServices.addNew(req);

  res.status(201).json({
    status: "success",
    code: 201,
    data: addedContact,
  });
};

module.exports = errorWrapper(addNew);
