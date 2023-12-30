const appRoot = process.cwd();
const { Schema, model } = require("mongoose");
const { REGEX } = require(appRoot + "/constants");

const contactSchemaDb = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minlength: 3,
    },
    email: {
      type: String,
      match: REGEX.emailRegex,
    },
    phone: {
      type: String,
      match: REGEX.phoneRegex,
      required: [true, "Set phone number for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchemaDb);

module.exports = Contact;
