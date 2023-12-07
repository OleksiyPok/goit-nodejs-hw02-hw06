const express = require("express");

const router = express.Router();
const jsonParser = express.json();

const { contactValidation, errorWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schemas");
const { contacts: ContactsController } = require("../../controllers");

// GET contacts
router.get("/", errorWrapper(ContactsController.getAll));

// GET contact by Id
router.get("/:contactId", errorWrapper(ContactsController.getById));

// DELETE contact by Id
router.delete("/:contactId", errorWrapper(ContactsController.deleteById));

// POST new contact
router.post(
  "/",
  jsonParser,
  contactValidation(contactSchema),
  errorWrapper(ContactsController.addNew)
);

// PUT contact by Id
router.put(
  "/:contactId",
  jsonParser,
  contactValidation(contactSchema),
  errorWrapper(ContactsController.updateById)
);

module.exports = router;
