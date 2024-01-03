const appRoot = process.cwd();
const { Contact } = require(appRoot + "/models");

const createError = require("http-errors");
const { errorWrapper } = require(appRoot + "/helpers");

const getById = async (req, res) => {
  const { id: ownerid } = req.user;
  const { contactId } = req.params;

  const contact = await Contact.findById(contactId)
    .and([{ owner: ownerid }])
    .populate("owner", "name email")
    .exec();

  console.log("contact:", contact);

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
