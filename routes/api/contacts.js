const express = require("express");

const router = express.Router();
const jsonParser = express.json();

const { contactValidation } = require("../../middlewares");
const { contactSchema } = require("../../schemas");
const { contacts: controller } = require("../../controllers");

// GET contacts
router.get("/", controller.getAll);

// GET contact by Id
router.get("/:contactId", controller.getById);

// DELETE contact by Id
router.delete("/:contactId", controller.deleteById);

// POST new contact
router.post(
  "/",
  jsonParser,
  contactValidation(contactSchema),
  controller.addNew
);

// PUT contact by Id
router.put(
  "/:contactId",
  jsonParser,
  contactValidation(contactSchema),
  controller.updateById
);

module.exports = router;
