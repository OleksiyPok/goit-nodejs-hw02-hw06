const fs = require("node:fs/promises");
const appRoot = process.cwd();
const path = require("node:path");
// const crypto = require("node:crypto");
const jimp = require("jimp");
const createError = require("http-errors");

const { errorWrapper } = require(appRoot + "/helpers");

// const { imageTools } = require(appRoot + "/middlewares");

const { User } = require(appRoot + "/models");
const dateSuffix = require(appRoot + "/helpers");

const updateAvatar = async (req, res) => {
  const file = req.file;
  console.log("file:", file);
  const userid = req.user.id;

  const tempFilePath = file.path;
  const { ext, name } = path.parse(tempFilePath);

  // const suffix = crypto.randomInt(100, 1000);
  const suffix = dateSuffix.getDateSuffix();
  const resultFileName = `${userid}-${name}-sm-${suffix}${ext}`;

  try {
    const resultFilePath = path.join(
      appRoot,
      "/public/avatars",
      resultFileName
    );

    await jimp.read(tempFilePath).then((image) => {
      image.resize(250, jimp.AUTO).write(resultFilePath);
      // image.cover(250, 250).write(resultFilePath);
    });

    await fs.unlink(tempFilePath);

    const shortFilePath = path.join("avatars", resultFileName);

    const updatedUser = await User.findByIdAndUpdate(
      userid,
      { avatar: shortFilePath },
      { new: true }
    ).exec();

    if (updatedUser === null) {
      throw createError(404, `User not found`);
    }

    res.status(200).json({
      message: "Avatar has been updated",
      status: "success",
      code: 200,
      data: {
        name: updatedUser.name,
        email: updatedUser.email,
        passwordHash: updatedUser.password,
        avatar: updatedUser.avatar,
      },
    });
  } catch (error) {
    await fs.unlink(tempFilePath);
    throw error;
  }
};

module.exports = module.exports = errorWrapper(updateAvatar);
