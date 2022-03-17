const express = require("express");

const {
  getSpecificSchedule,
  getActiveSchedules,
  getAllSchedulesForCurrentUser,
  createAvailabilitySchedule,
  activateSchedule,
} = require("../controllers/availability");

const router = express.Router();

const protect = require("../middleware/auth");

const { validateAvailability, validateScheduleId } = require("../validate");

router.route("/").get(protect, getAllSchedulesForCurrentUser);

router
  .route("/")
  .post([protect, validateAvailability], createAvailabilitySchedule);

router.route("/active").get(protect, getActiveSchedules);

router
  .route("/:scheduleId")
  .get([protect, validateScheduleId], getSpecificSchedule);

router
  .route("/:scheduleId/activate")
  .patch([protect, validateScheduleId], activateSchedule);

module.exports = router;
