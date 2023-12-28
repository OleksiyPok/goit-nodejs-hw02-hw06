const express = require("express");

const router = express.Router();
const jsonParser = express.json();

const { contactSchemaApi, contactSchemaApiFavorite } = require("../../models");
const { contacts: ContactsController } = require("../../controllers");
const { contactValidation } = require("../../middlewares");

// GET contacts
router.get("/", ContactsController.getAll);

// GET contact by Id
router.get("/:contactId", ContactsController.getById);

// DELETE contact by Id
router.delete("/:contactId", ContactsController.deleteById);

// POST new contact
router.post(
  "/",
  jsonParser,
  contactValidation(contactSchemaApi),
  ContactsController.addNew
);

// PUT contact by Id
router.put(
  "/:contactId",
  jsonParser,
  contactValidation(contactSchemaApi),
  ContactsController.updateById
);

// PATCH field "favorite" by contact Id
router.patch(
  "/:contactId/favorite",
  jsonParser,
  contactValidation(contactSchemaApiFavorite),
  ContactsController.updateFavoriteById
);

module.exports = router;
