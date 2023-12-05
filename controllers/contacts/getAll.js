const productsOperations = require("../../models/contacts");

const getAll = async (req, res, next) => {
  try {
    const list = await productsOperations.listContacts();
    res.status(200).json({
      status: "success",
      code: 200,
      data: list,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
