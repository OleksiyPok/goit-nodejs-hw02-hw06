const contactsOperations = require("../../db/contactsOparations");

const createError = require("http-errors");
const { errorWrapper } = require("../../helpers");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsOperations.getContactById(contactId);

  if (contact === null) {
    throw createError(
      404,
      `The requested contact has not been found (id: ${contactId})`
    );
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: contact,
  });
};

module.exports = errorWrapper(getById);
