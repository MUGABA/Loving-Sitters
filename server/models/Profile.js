const mongoose = require("mongoose");

const options = {
  discriminatorKey: "type",
};

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    stripeAccountId: {
      type: String,
      required: true,
    },
    activeScheduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Availability",
    },
    name: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    address: {
      type: String,
      default: "",
    },
    telephone: {
      type: String,
      default: "",
    },
    birthday: {
      type: Date,
      default: null,
    },
    photo: {
      type: String,
      default: "",
    },
    accountType: {
      type: String,
      enum: ["petSitter", "petOwner"],
      default: "petOwner",
    },
    isOnline: {
      type: Boolean,
      default: true,
    },
  },
  { ...options }
);

module.exports = Profile = mongoose.model("Profile", profileSchema);
