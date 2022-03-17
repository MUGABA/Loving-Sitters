const Availability = require("../models/availability");
const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");

// @route POST /availability
// @desc create pet sitter availability
// @access Private
exports.createAvailabilitySchedule = asyncHandler(async (req, res, next) => {
  const { name, isActive, schedules } = req.body;

  const userId = req.user.id;

  const profiles = await Profile.find({ userId });
  const profileId = profiles[0]._id;

  const hasActiveSchedule =
    isActive && (await Availability.find({ profileId, isActive }));

  if (hasActiveSchedule.length) {
    res.status(400);
    throw new Error("You already have an active schedule");
  }

  const availability = await Availability.create({
    name,
    profileId,
    isActive,
    schedules,
  });

  if (availability) {
    return res.status(201).send({ success: availability });
  } else {
    res.status(400);
    throw new Error("invalid data");
  }
});

// @route GET /availability/:scheduleId
// @desc returns data a specific availability id
// @access Private
exports.getSpecificSchedule = asyncHandler(async (req, res, next) => {
  const scheduleId = req.params.scheduleId;

  const schedule = await Availability.findById(scheduleId).select(["-__v"]);

  if (schedule) {
    return res.status(200).send({ success: schedule });
  } else {
    res.status(404);
    throw new Error("Schedule not found");
  }
});

// @route GET /availability/active
// @desc returns a list of active schedule for all sitters available
// @access Private
exports.getActiveSchedules = asyncHandler(async (req, res, next) => {
  const schedule = await Availability.findOne()
    .where("isActive")
    .equals(true)
    .select(["-__v"]);

  if (schedule.length) {
    return res.status(200).send({ success: schedule });
  } else {
    res.status(404);
    throw new Error("No active schedule not found");
  }
});

// @route GET /availability/
// @desc returns a list of all scedules for logged in user
// @access Private
exports.getAllSchedulesForCurrentUser = asyncHandler(async (req, res, next) => {
  const schedule = await Availability.find().select(["-__v"]);

  if (schedule.length) {
    return res.status(200).send({ success: schedule });
  } else {
    res.status(404);
    throw new Error("No schedules yet");
  }
});

// @route PATCH /availability/:scheduleId/activate
// @desc make a schedule active
// @access Private
exports.activateSchedule = asyncHandler(async (req, res, next) => {
  const scheduleId = req.params.scheduleId;

  const userId = req.user.id;

  const profiles = await Profile.find({ userId });
  const profileId = profiles[0]._id;

  // find and deactivate the current active schedule
  const activeSchedule = await Availability.findOne()
    .where("isActive")
    .equals(true);
  if (activeSchedule) {
    activeSchedule.set({ isActive: false });
    await activeSchedule.save();
  }

  // actvate the schedule with the given id
  const schedule = await Availability.findOne({ _id: scheduleId });
  if (schedule) {
    schedule.set({ isActive: true });
    await schedule.save();

    const profile = await Profile.findOne({ _id: profileId });
    profile.set({ activeScheduleId: schedule._id });

    const updatedProfile = await profile.save();

    return res.status(200).send({
      success: {
        profile: updatedProfile,
      },
    });
  } else {
    res.status(404);
    throw new Error("Schedule not found");
  }
});
