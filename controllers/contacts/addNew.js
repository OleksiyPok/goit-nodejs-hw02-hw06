const appRoot = process.cwd();
const { Contact } = require(appRoot + "/models");

const { errorWrapper } = require(appRoot + "/helpers");

const addNew = async (req, res) => {
  const addedContact = await Contact.create(req.body);

  res.status(201).json({
    status: "success",
    code: 201,
    data: addedContact,
  });
};

module.exports = errorWrapper(addNew);
