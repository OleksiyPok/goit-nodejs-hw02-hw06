require("dotenv").config();
const appRoot = process.cwd();
const multer = require("multer");
const path = require("node:path");
const tempDir = process.env.UPLOAD_DIR;

const tempFilePath = path.join(appRoot, tempDir);

const storage = multer.diskStorage({
  destination: tempFilePath,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 3000000,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes("image")) {
      cb(null, true);
    }
  },
});

module.exports = upload;
