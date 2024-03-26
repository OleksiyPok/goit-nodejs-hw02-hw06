const appRoot = process.cwd();

const createError = require("http-errors");
const { errorWrapper } = require(appRoot + "/helpers");
const { dbContactServices } = require(appRoot + "/services");

const deleteById = async (req, res) => {
  const deletedContact = await dbContactServices.deleteById(req);

  if (deletedContact === null) {
    throw createError(
      404,
      `The requested contact has not been found (id: ${req.params.contactId})`
    );
  }

  res.status(200).json({
    status: "success",
    code: 200,
    message: `Contact '${deletedContact.name}' has been successfully deleted`,
    // data: deletedContacts,
  });
};

module.exports = errorWrapper(deleteById);
