const express = require("express");

const router = express.Router();
const jsonParser = express.json();

const { contactSchemaApi, contactSchemaApiFavorite } = require("../../models");
const { contacts: ContactsController } = require("../../controllers");
const { auth, validation } = require("../../middlewares");

// GET contacts
router.get("/", auth, ContactsController.getAll);

// GET contact by Id
router.get("/:contactId", auth, ContactsController.getById);

// DELETE contact by Id
router.delete("/:contactId", auth, ContactsController.deleteById);

// POST new contact
router.post(
  "/",
  jsonParser,
  auth,
  validation(contactSchemaApi),
  ContactsController.addNew
);

// PUT contact by Id
router.put(
  "/:contactId",
  jsonParser,
  auth,
  validation(contactSchemaApi),
  ContactsController.updateById
);

// PATCH field "favorite" by contact Id
router.patch(
  "/:contactId/favorite",
  jsonParser,
  auth,
  validation(contactSchemaApiFavorite),
  ContactsController.updateFavoriteById
);

module.exports = router;
