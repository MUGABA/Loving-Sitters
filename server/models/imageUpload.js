const mongoose = require("mongoose");

const imageUploadSchema = new mongoose.Schema({
  imageUrlPath: {
    type: String,
    default: "",
  },
});

module.exports = ImageUrl = mongoose.model("ImageUrl", imageUploadSchema);
