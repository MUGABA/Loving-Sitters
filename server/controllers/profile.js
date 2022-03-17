const Profile = require("../models/Profile");
const Availability = require("../models/availability");
const asyncHandler = require("express-async-handler");

// @route PUT /profile/edit
// @desc edit user profile
// @access Public
exports.editProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ userId: req.user.id });

  if (!profile) {
    res.status(404);
    throw new Error("Profile doesn't exist");
  }
  profile.set(req.body);
  const updatedProfile = await profile.save();

  res.status(200).json({
    success: {
      profile: updatedProfile,
    },
  });
});

// @route GET /profile/load
// @desc Get user profile data
// @access Private
exports.loadProfile = asyncHandler(async (req, res, next) => {
  const profile = await User.findById(req.user.id, "profile");

  if (!profile) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json({
    success: {
      profile: profile,
    },
  });
});

// @route GET /users
// @desc Search for profiles
// @access Private
exports.searchProfiles = asyncHandler(async (req, res, next) => {
  const location = req.query.search;
  const date = req.query.date.toLowerCase();
  let profiles;
  let filteredProfiles;

  try {
    profiles = await Profile.find({ address: location })
      .populate("activeScheduleId")
      .lean();
    filteredProfiles = profiles.map((profile) => {
      if (profile.activeScheduleId.isActive) {
        const days = Object.keys(profile.activeScheduleId.schedules);
        if (
          days.includes(date) &&
          profile.activeScheduleId.schedules[date].isAvailable
        ) {
          return profile;
        }
        return [];
      }
      return [];
    });

    if (!profiles) {
      res.status(404);
      throw new Error("No users found in search");
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
  res.status(200).json({ users: filteredProfiles.flat() });
});
