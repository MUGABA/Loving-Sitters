const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "./data" });
const protect = require("../middleware/auth");
const { uploadPicture, removePicture } = require("../controllers/imageUpload");

router
  .route("/upload")
  .post(protect, upload.single("profilePhoto"), uploadPicture);
router.route("/upload/").put(protect, removePicture);

module.exports = router;
