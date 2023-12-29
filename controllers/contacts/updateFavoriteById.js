const { Contact } = require("../../models");

const createError = require("http-errors");
const { errorWrapper } = require("../../helpers");

const updateFavoriteById = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );

  if (updatedContact === null) {
    throw createError(
      404,
      `The requested contact has not been found (id: ${contactId})`
    );
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: updatedContact,
  });
};

module.exports = errorWrapper(updateFavoriteById);
