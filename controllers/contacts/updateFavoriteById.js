const appRoot = process.cwd();
const { Contact } = require(appRoot + "/models");

const createError = require("http-errors");
const { errorWrapper } = require(appRoot + "/helpers");
const { dbContactServices } = require(appRoot + "/services");

const updateFavoriteById = async (req, res) => {
  const updatedContact = await dbContactServices.updateFavoriteById(req);

  if (updatedContact === null) {
    throw createError(
      404,
      `The requested contact has not been found (id: ${req.params.contactId})`
    );
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: updatedContact,
  });
};

module.exports = errorWrapper(updateFavoriteById);
