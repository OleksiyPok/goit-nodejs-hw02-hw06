const appRoot = process.cwd();
const path = require("node:path");

require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();

const routes = require("./routes/api/index");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());

app.use("/api", routes);

app.use(express.static(path.join(appRoot, "public")));
// app.use(express.static("public"));

// develop
app.get("/ping", (req, res) => {
  res.status(200).send("ping => pong");
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  res.status(status).json({ message: err.message });
});

module.exports = app;
