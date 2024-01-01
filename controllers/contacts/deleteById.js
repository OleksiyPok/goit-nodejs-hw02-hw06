const appRoot = process.cwd();
const { Contact } = require(appRoot + "/models");

const createError = require("http-errors");
const { errorWrapper } = require(appRoot + "/helpers");

const deleteById = async (req, res) => {
  const { id: ownerid } = req.user;
  const { contactId } = req.params;

  const deletedContacts = await Contact.findByIdAndDelete(contactId)
    .and([{ owner: ownerid }])
    .exec();

  if (deletedContacts === null) {
    throw createError(
      404,
      `The requested contact has not been found (id: ${contactId})`
    );
  }

  res.status(200).json({
    status: "success",
    code: 200,
    message: `Contact '${deletedContacts.name}' has been successfully deleted`,
    // data: deletedContacts,
  });
};

module.exports = errorWrapper(deleteById);
