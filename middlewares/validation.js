const createError = require("http-errors");

const validation = (schemaApi) => {
  return (req, res, next) => {
    const { error } = schemaApi.validate(req.body, {
      allowUnknown: false,
    });

    if (error) {
      throw createError(400, error.details[0].message);
    }
    next();
  };
};

module.exports = validation;
