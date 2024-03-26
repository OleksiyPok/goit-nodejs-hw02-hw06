const appRoot = process.cwd();

const createError = require("http-errors");
const { errorWrapper } = require(appRoot + "/helpers");
const { dbContactServices } = require(appRoot + "/services");

const getById = async (req, res) => {
  const contact = await dbContactServices.getById(req);

  if (contact === null) {
    throw createError(
      404,
      `The requested contact has not been found (id: ${req.params.contactId})`
    );
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: contact,
  });
};

module.exports = errorWrapper(getById);
