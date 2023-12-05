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
  try {
    const list = await listContacts();
    res.status(200).json({
      status: "success",
      code: 200,
      data: list,
    });
  } catch (error) {
    next(error);
  }
});

// GET contact by Id
router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (contact === null) {
      const error = new Error(
        `The requested contact has not been found (id: ${contactId})`
      );
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      status: "success",
      code: 200,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE contact by Id
router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContacts = await removeContact(contactId);

    if (deletedContacts === null) {
      const error = new Error(
        `The requested contact has not been found (id: ${contactId})`
      );
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      status: "success",
      code: 200,
      message: `Contact '${deletedContacts.name}' has been successfully deleted`,
    });
  } catch (error) {
    next(error);
  }
});

// POST contacts
router.post("/", jsonParser, async (req, res, next) => {
  try {
    const { error, value } = contactsSchema.validate(req.body, {
      allowUnknown: false,
    });

    if (typeof error !== "undefined") {
      const error = new Error(error.details[0].message);
      error.status = 400;
      throw error;
    }

    const newContact = {
      id: crypto.randomUUID(),
      name: value.name,
      email: value.email,
      phone: value.phone || value.number,
    };

    const addedContact = await addContact(newContact);
    res.status(201).json({
      status: "success",
      code: 201,
      data: addedContact,
    });
  } catch (error) {
    next(error);
  }
});

// PUT contact by Id
router.put("/:contactId", jsonParser, async (req, res, next) => {
  try {
    const { error, value } = contactsSchema.validate(req.body, {
      allowUnknown: false,
    });

    if (typeof error !== "undefined") {
      const error = new Error(error.details[0].message);
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const editedContact = {
      name: value.name,
      email: value.email,
      phone: value.phone || value.number,
    };
    const updatedContact = await updateContact(contactId, editedContact);

    if (updatedContact === null) {
      const error = new Error(
        `The requested contact has not been found  (id: ${contactId})`
      );
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      status: "success",
      code: 200,
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
