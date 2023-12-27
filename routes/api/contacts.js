const express = require("express");

const contactRouter = express.Router();
const jsonParser = express.json();

const { contactSchemaApi } = require("../../models");
const { contacts: ContactsController } = require("../../controllers");
const { contactValidation } = require("../../middlewares");

// GET contacts
contactRouter.get("/", ContactsController.getAll);

// GET contact by Id
contactRouter.get("/:contactId", ContactsController.getById);

// DELETE contact by Id
contactRouter.delete("/:contactId", ContactsController.deleteById);

// POST new contact
contactRouter.post(
  "/",
  jsonParser,
  contactValidation(contactSchemaApi),
  ContactsController.addNew
);

// PUT contact by Id
contactRouter.put(
  "/:contactId",
  jsonParser,
  contactValidation(contactSchemaApi),
  ContactsController.updateById
);

module.exports = contactRouter;
