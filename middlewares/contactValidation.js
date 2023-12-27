const createError = require("http-errors");

const contactValidation = (contactSchemaApi) => {
  return (req, res, next) => {
    const { error } = contactSchemaApi.validate(req.body, {
      allowUnknown: false,
    });

    if (error) {
      throw createError(400, error.details[0].message);
    }
    next();
  };
};

module.exports = contactValidation;
