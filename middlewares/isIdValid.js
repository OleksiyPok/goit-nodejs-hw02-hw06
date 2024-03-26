import mongoose from "mongoose";
const createError = require("http-errors");
const appRoot = process.cwd();
const { errorWrapper } = require(appRoot + "/helpers");

const isIdValid = async (req, res, next) => {
  if (!mongoose.isValidObjectId(req)) {
    throw createError(400, `req is not valid id`);
  }
};

module.exports = errorWrapper(isIdValid);
