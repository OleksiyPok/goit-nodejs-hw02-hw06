const appRoot = process.cwd();
const { Contact } = require(appRoot + "/models");
const { User } = require(appRoot + "/models");
const createError = require("http-errors");

const { errorWrapper } = require(appRoot + "/helpers");

const deleteUser = async (req, res) => {
  const userid = req.user.id;
  const deletedUser = await User.findByIdAndDelete(userid).exec();

  if (deletedUser === null) {
    throw createError(
      404,
      `The requested user has not been found (id: ${userid})`
    );
  }

  const { id, name, email, subscription, avatar, createdAt, updatedAt } =
    deletedUser;

  const deletedData = await Contact.deleteMany({ owner: userid }).exec();
  const deletedUserDataItems = deletedData.deletedCount;

  res.status(200).json({
    status: "success",
    code: 200,
    message: `User id:${id} ( '${name}' )  has been successfully deleted`,
    data: {
      deletedUser: {
        id,
        name,
        email,
        subscription,
        avatar,
        createdAt,
        updatedAt,
      },
      deletedUserDataItems,
    },
  });

  //   res.status(200).json({ message: "delete user" });
};

module.exports = errorWrapper(deleteUser);
