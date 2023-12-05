const express = require("express");

const router = express.Router();
const jsonParser = express.json();

const { contactValidation, errorWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schemas");
const { contacts: controller } = require("../../controllers");

// GET contacts
router.get("/", errorWrapper(controller.getAll));

// GET contact by Id
router.get("/:contactId", errorWrapper(controller.getById));

// DELETE contact by Id
router.delete("/:contactId", errorWrapper(controller.deleteById));

// POST new contact
router.post(
  "/",
  jsonParser,
  contactValidation(contactSchema),
  errorWrapper(controller.addNew)
);

// PUT contact by Id
router.put(
  "/:contactId",
  jsonParser,
  contactValidation(contactSchema),
  errorWrapper(controller.updateById)
);

module.exports = router;
