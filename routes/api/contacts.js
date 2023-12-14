const express = require("express");

const contactRouter = express.Router();
const jsonParser = express.json();

const { errorWrapper } = require("../../helpers");
const { contactValidation } = require("../../middlewares");
const { contactSchema } = require("../../models/schemas");
const { contacts: ContactsController } = require("../../controllers");

// GET contacts
contactRouter.get("/", errorWrapper(ContactsController.getAll));

// GET contact by Id
contactRouter.get("/:contactId", errorWrapper(ContactsController.getById));

// DELETE contact by Id
contactRouter.delete(
  "/:contactId",
  errorWrapper(ContactsController.deleteById)
);

// POST new contact
contactRouter.post(
  "/",
  jsonParser,
  contactValidation(contactSchema),
  errorWrapper(ContactsController.addNew)
);

// PUT contact by Id
contactRouter.put(
  "/:contactId",
  jsonParser,
  contactValidation(contactSchema),
  errorWrapper(ContactsController.updateById)
);

module.exports = contactRouter;
