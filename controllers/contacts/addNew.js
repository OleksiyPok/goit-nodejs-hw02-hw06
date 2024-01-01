const appRoot = process.cwd();
const { Contact } = require(appRoot + "/models");

// const createError = require("http-errors");
const { errorWrapper } = require(appRoot + "/helpers");

const addNew = async (req, res) => {
  const { id: ownerid } = req.user;
  const newContact = { ...req.body, owner: ownerid };
  const addedContact = await Contact.create(newContact);

  res.status(201).json({
    status: "success",
    code: 201,
    data: addedContact,
  });
};

module.exports = errorWrapper(addNew);
