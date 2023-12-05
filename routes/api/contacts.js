const express = require("express");
const createError = require("http-errors");

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
      throw createError(
        404,
        `The requested contact has not been found (id: ${contactId})`
      );
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
      throw createError(
        404,
        `The requested contact has not been found (id: ${contactId})`
      );
    }

    res.status(200).json({
      status: "success",
      code: 200,
      message: `Contact '${deletedContacts.name}' has been successfully deleted`,
      // data: deletedContacts,
    });
  } catch (error) {
    next(error);
  }
});

// POST contacts
router.post("/", jsonParser, async (req, res, next) => {
  try {
    const validatedBody = contactsSchema.validate(req.body, {
      allowUnknown: false,
    });

    if (typeof validatedBody.error !== "undefined") {
      throw createError(400, error.details[0].message);
    }

    const addedContact = await addContact(validatedBody.value);
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
    const validatedBody = contactsSchema.validate(req.body, {
      allowUnknown: false,
    });

    if (typeof validatedBody.error !== "undefined") {
      throw createError(400, error.details[0].message);
    }

    const { contactId } = req.params;
    const updatedContact = await updateContact(contactId, validatedBody.value);

    if (updatedContact === null) {
      throw createError(
        404,
        `The requested contact has not been found (id: ${contactId})`
      );
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
