const productsOperations = require("../../models/contacts");

const getAll = async (req, res) => {
  const list = await productsOperations.listContacts();
  res.status(200).json({
    status: "success",
    code: 200,
    data: list,
  });
};

module.exports = getAll;
