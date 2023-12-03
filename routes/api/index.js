const express = require("express");

const router = express.Router();

const userRoutes = require("./users");
const contactsRoutes = require("./contacts");

router.use("/users", userRoutes);
router.use("/contacts", contactsRoutes);

module.exports = router;
