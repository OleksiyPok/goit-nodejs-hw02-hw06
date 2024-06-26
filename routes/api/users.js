const appRoot = process.cwd();
const path = require("node:path");
const { upload } = require(appRoot + "/middlewares");

const express = require("express");

const userRouter = express.Router();
const jsonParser = express.json();

const { UserController } = require(path.join(appRoot + "/controllers"));

path.join(process.cwd());
const { auth, validation } = require(appRoot + "/middlewares");
const {
  userRegisterSchemaApi,
  userVerifyEmailSchemaApi,
  userLoginSchemaApi,
  userSubscriptionSchemaApi,
} = require(appRoot + "/models");

// POST register user
userRouter.post(
  "/register",
  jsonParser,
  validation(userRegisterSchemaApi),
  UserController.register
);

// GET verify user email
userRouter.get(
  "/verify/:verificationToken",
  jsonParser,
  UserController.verifyEmail
);

// POST resend verification email
userRouter.post(
  "/verify",
  jsonParser,
  validation(userVerifyEmailSchemaApi),
  UserController.resendEmail
);

// POST login user
userRouter.post(
  "/login",
  jsonParser,
  validation(userLoginSchemaApi),
  UserController.login
);

// POST logout user
userRouter.post("/logout", jsonParser, auth, UserController.logout);

// GET current user
userRouter.get("/current", jsonParser, auth, UserController.getCurrent);

// PATCH user subscription
userRouter.patch(
  "/",
  jsonParser,
  auth,
  validation(userSubscriptionSchemaApi),
  UserController.updateSubscription
);

// PATCH user avatar
userRouter.patch(
  "/avatar",
  auth,
  upload.single("avatar"),
  UserController.updateAvatar
);

// DELETE user and data
userRouter.delete("/delete", auth, UserController.deleteUser);

module.exports = userRouter;
