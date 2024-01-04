const appRoot = process.cwd();
const { Schema, model } = require("mongoose");
const { REGEX, commonConst } = require(appRoot + "/constants");

const { userSubscription } = commonConst;

const userSchemaDb = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for user"],
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, "Set email for user identification"],
      match: REGEX.emailRegex,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user identification"],
    },
    avatar: {
      type: String,
      default: null,
    },
    subscription: {
      type: String,
      enum: userSubscription,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: "",
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchemaDb);

module.exports = User;
