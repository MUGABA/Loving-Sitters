const multer = require("multer");
const DatauriParser = require("datauri/parser");
const path = require("path");

const storage = multer.memoryStorage();
const parser = new DatauriParser();

const multerSingleUpload = multer({ storage }).single("image");

const dataUri = (file) =>
  parser.format(path.extname(file.originalname).toString(), file.buffer);

module.exports = { multerSingleUpload, dataUri };
