const appRoot = process.cwd();
const { Contact } = require(appRoot + "/models");

const getAll = async (req) => {
  const { favorite } = req.query;
  const owner = req.user.id;

  const searchQuery = req.query.favorite ? { owner, favorite } : { owner };

  const allData = await Contact.find(
    searchQuery,
    "-createdAt -updatedAt -owner"
  )
    .and([{ owner }])
    .exec();

  return allData;
};

const getPaginated = async (req) => {
  const { skip, limit, favorite } = req.query;
  const owner = req.user.id;

  const searchQuery = req.query.favorite ? { owner, favorite } : { owner };

  const currPageData = await Contact.find(
    searchQuery,
    "-createdAt -updatedAt -owner",
    {
      skip: Number(skip),
      limit: Number(limit),
    }
  )
    .and([{ owner: req.user.id }])
    .exec();

  return currPageData;
};

const addNew = async ({ user, body }) => {
  const newContact = { ...body, owner: user.id };
  const addedContact = await Contact.create(newContact);
  return addedContact;
};

const getById = async ({ user, params }) => {
  const contact = await Contact.findById(params.contactId)
    .and([{ owner: user.id }])
    .populate("owner", "name email")
    .exec();

  return contact;
};

const deleteById = async ({ user, params }) => {
  const deletedContact = await Contact.findByIdAndDelete(params.contactId)
    .and([{ owner: user.id }])
    .exec();

  return deletedContact;
};

const updateById = async ({ user, body, params }) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    params.contactId,
    body,
    {
      new: true,
    }
  )
    .and([{ owner: user.id }])
    .exec();

  return updatedContact;
};

const updateFavoriteById = async ({ user, body, params }) => {
  const { favorite } = body;

  const updatedContact = await Contact.findByIdAndUpdate(
    params.contactId,
    { favorite },
    { new: true }
  )
    .and([{ owner: user.id }])
    .exec();

  return updatedContact;
};

module.exports = {
  getAll,
  getPaginated,
  addNew,
  getById,
  deleteById,
  updateById,
  updateFavoriteById,
};
