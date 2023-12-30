const appRoot = process.cwd();
const { User } = require(appRoot + "/models");
const { JWT_SECRET } = process.env;

const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ", 2);

  try {
    if (bearer !== "Bearer") {
      throw createError(401, "Not autorized");
    }

    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id).exec();

    if (!user || !user.token) {
      throw createError(401, "Not autorized");
    }

    req.user = user;

    next();
  } catch (error) {
    if (error.message === "invalid signature") {
      error.status = 401;
    }

    next(error);
  }
};

module.exports = auth;
