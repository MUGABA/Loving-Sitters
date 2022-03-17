const asyncHandler = require("express-async-handler");
const { cloudinary } = require("../utils/cloudinary");
const Profile = require("../models/Profile");
const User = require("../models/User");

// @route POST /upload
// @desc insert user profile
// @access Private
exports.uploadPicture = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const uploadedPhoto = req.file.path;
  let imageUrlPath;
  try {
    imageUrlPath = await cloudinary.uploader.upload(
      uploadedPhoto,
      async (err) => {
        if (err) {
          console.error(err);
        }
      }
    );
  } catch (err) {
    res.status(500).send({
      message: "update image fail ",
    });
  }

  const { url } = imageUrlPath;
  const user = await User.findById(userId);
  const profile = await Profile.findOneAndUpdate(
    userId,
    { photo: url },
    { new: true }
  );
  res.status(201).json({ message: "upload successful", user, profile });
});

// @route PUT /
// @desc remove photo
// @access Private
exports.removePicture = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(req.user.id);
    const profile = await Profile.findOneAndUpdate(
      userId,
      { photo: "" },
      { new: true }
    );
    res.status(201).json({ message: "image deleted", user, profile });
  } catch (err) {
    res.status(500).send({
      message: "delete image fail ",
    });
  }
});
