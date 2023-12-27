const contactsOperations = require("../../db/contactsOparations");

const { errorWrapper } = require("../../helpers");

const getAll = async (req, res) => {
  const list = await contactsOperations.listContacts();
  res.status(200).json({
    status: "success",
    code: 200,
    data: list,
  });
};

module.exports = errorWrapper(getAll);
