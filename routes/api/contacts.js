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
  const list = await listContacts();
  res.status(200).json(list);
});

// GET contact by Id
router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (contact === null) {
    res
      .status(400)
      .json({ message: "The requested contact has not been found" });
  } else {
    res.status(200).json(contact);
  }
});

// DELETE contact by Id
router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContacts = await removeContact(contactId);

  if (deletedContacts === null) {
    res
      .status(400)
      .json({ message: "The requested contact has not been found" });
  } else {
    res.status(200).json(deletedContacts);
  }
});

// POST contacts
router.post("/", jsonParser, async (req, res, next) => {
  const { error, value } = contactsSchema.validate(req.body, {
    allowUnknown: false,
  });
  if (typeof error !== "undefined") {
    res.status(400).json(error.details[0].message);
    return;
  }

  const newContact = {
    id: crypto.randomUUID(),
    name: value.name,
    email: value.email,
    phone: value.phone || value.number,
  };

  const addedContact = await addContact(newContact);

  res.status(201).json(addedContact);
});

// PUT contact by Id
router.put("/:contactId", jsonParser, async (req, res, next) => {
  const { error, value } = contactsSchema.validate(req.body, {
    allowUnknown: false,
  });

  if (typeof error !== "undefined") {
    res.status(400).json(error.details[0].message);
    return;
  }
  const { contactId } = req.params;
  const editedContact = {
    name: value.name,
    email: value.email,
    phone: value.phone || value.number,
  };
  const updatedContact = await updateContact(contactId, editedContact);

  if (updatedContact === null) {
    res
      .status(400)
      .json({ message: "The requested contact has not been found" });
  } else {
    res.status(200).json(updatedContact);
  }
});

module.exports = router;
