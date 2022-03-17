const mongoose = require("mongoose");

const daySchedule = new mongoose.Schema({
  isAvailable: {
    type: Boolean,
    default: false,
  },
  startTime: {
    type: Number,
    min: 0,
    max: 23,
    required: () => this.isAvailable,
  },
  endTime: {
    type: Number,
    min: 0,
    max: 23,
    required: () => this.isAvailable,
  },
});

const availabilitySchema = new mongoose.Schema({
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Profile",
  },
  name: {
    type: String,
    default: "",
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  schedules: {
    monday: daySchedule,
    tuesday: daySchedule,
    wednesday: daySchedule,
    thursday: daySchedule,
    friday: daySchedule,
    saturday: daySchedule,
    sunday: daySchedule,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
});

function endTimeValidator(value) {
  return value > this.startTime;
}

daySchedule
  .path("endTime")
  .validate(endTimeValidator, "End Time should be greater start time");

module.exports = Availability = mongoose.model(
  "Availability",
  availabilitySchema
);
