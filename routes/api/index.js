const express = require("express");

const router = express.Router();

// const userRoutes = require("./users");
const contactsRoutes = require("./contacts");

// router.use(userRoutes);
router.use(contactsRoutes);

module.exports = router;
