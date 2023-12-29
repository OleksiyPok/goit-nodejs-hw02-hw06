const express = require("express");

const router = express.Router();

const userRouter = require("./users");
const contactRouter = require("./contacts");

router.use("/users", userRouter);
router.use("/contacts", contactRouter);

module.exports = router;
