const express = require("express");
const crypto = require("node:crypto");
const router = express.Router();

const jsonParser = express.json();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const contactsSchema = require("../../schemas/contacts");

// GET contacts
router.get("/", async (req, res, next) => {
  // res.json({ message: "get" });
});

// GET contact by Id
router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  res.json({ message: "get contact" });
});

// POST contacts
router.post("/", jsonParser, async (req, res, next) => {
  const { error, value } = contactsSchema.validate(req.body, {
    allowUnknown: false,
  });
  if (typeof error !== "undefined") {
    res.status(400).json(error.details[0].message);
  }

  const newContact = {
    id: crypto.randomUUID(),
    name: value.name,
    email: value.email,
    number: value.number,
  };

  res.status(200).json(newContact);

  // res.json({ message: "post" });
});

// DELETE contact by Id
router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  res.json({ message: "delete" });
});

// PUT contact by Id
router.put("/:contactId", jsonParser, async (req, res, next) => {
  const { error, value } = contactsSchema.validate(req.body);

  if (typeof error !== "undefined") {
    res.status(400).json(error.details[0].message);
  }

  const { contactId } = req.params;

  const editedContact = {
    id: contactId,
    name: value.name,
    email: value.email,
    number: value.number,
  };

  res.status(200).json(editedContact);

  // res.json({ message: "put" });
});

module.exports = router;
