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
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error",
    });
  }
});

// GET contact by Id
router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (contact === null) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `The requested contact has not been found (id: ${contactId})`,
      });
      return;
    }

    res.status(200).json({
      status: "success",
      code: 200,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error",
    });
  }
});

// DELETE contact by Id
router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContacts = await removeContact(contactId);

    if (deletedContacts === null) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `The requested contact has not been found (id: ${contactId})`,
      });
      return;
    }

    res.status(200).json({
      status: "success",
      code: 200,
      message: `Contact '${deletedContacts.name}' has been successfully deleted`,
    });
    // res.status(200).json({
    //   status: "success",
    //   code: 200,
    //   data: deletedContacts,
    // });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error",
    });
  }
});

// POST contacts
router.post("/", jsonParser, async (req, res, next) => {
  try {
    const { error, value } = contactsSchema.validate(req.body, {
      allowUnknown: false,
    });

    if (typeof error !== "undefined") {
      res.status(400).json({
        status: "error",
        code: 400,
        message: error.details[0].message,
      });
      return;
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
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error",
    });
  }
});

// PUT contact by Id
router.put("/:contactId", jsonParser, async (req, res, next) => {
  try {
    const { error, value } = contactsSchema.validate(req.body, {
      allowUnknown: false,
    });

    if (typeof error !== "undefined") {
      res.status(400).json({
        status: "error",
        code: 400,
        massage: error.details[0].message,
      });
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
      res.status(404).json({
        status: "error",
        code: 404,
        message: `The requested contact has not been found  (id: ${contactId})`,
      });
      return;
    }

    res.status(200).json({
      status: "success",
      code: 200,
      data: updatedContact,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error",
    });
  }
});

module.exports = router;
