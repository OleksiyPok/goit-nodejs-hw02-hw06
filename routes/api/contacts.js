const express = require("express");

const router = express.Router();

// GET contacts
router.get("/", async (req, res, next) => {
  res.json({ message: "get" });
});

// GET contact by Id
router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "get contact" });
});

// POST contacts
router.post("/", async (req, res, next) => {
  res.json({ message: "post" });
});

// DELETE contact by Id
router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "delete" });
});

// PUT contact by Id
router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "put" });
});

module.exports = router;
