const { Availability } = require("../models/availability");
exports.getAvailabilityData = async (conditions = {}) => {
  const availability = await Availability.aggregate([
    { $match: { ...conditions } },
    {
      $lookup: {
        from: "schedules",
        localField: "_id",
        foreignField: "availabilityId",
        as: "schedules",
      },
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        isActive: { $first: "$isActive" },
        userId: { $first: "$userId" },
        schedules: {
          $first: {
            monday: { $first: "$schedules.monday" },
            tuesday: { $first: "$schedules.tuesday" },
            wednesday: { $first: "$schedules.wednesday" },
            thursday: { $first: "$schedules.thursday" },
            friday: { $first: "$schedules.friday" },
            saturday: { $first: "$schedules.saturday" },
            sunday: { $first: "$schedules.sunday" },
          },
        },
      },
    },
  ]);

  return availability;
};
