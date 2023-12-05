const express = require("express");
const createError = require("http-errors");

const router = express.Router();
const jsonParser = express.json();

const { contacts: controller } = require("../../controllers");

// GET contacts
router.get("/", controller.getAll);

// GET contact by Id
router.get("/:contactId", controller.getById);

// DELETE contact by Id
router.delete("/:contactId", controller.deleteById);

// POST contacts
router.post("/", jsonParser, controller.addNew);

// PUT contact by Id
router.put("/:contactId", jsonParser, controller.updateById);

module.exports = router;
