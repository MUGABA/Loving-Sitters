const Request = require("../models/Request");
exports.getRequestsData = async (conditions = {}) => {
  const requests = await Request.aggregate([
    { $match: { ...conditions } },
    {
      $lookup: {
        from: "profiles",
        localField: "userId",
        foreignField: "_id",
        as: "profiles",
      },
    },

    {
      $project: {
        start: {
          $dateToString: {
            format: `%m/%d/%Y`,
            date: "$start",
          },
        },
        end: {
          $dateToString: { format: "%d/%m/%Y", date: "$end" },
        },
        status: "$status",
        userId: "$userId",
        profiles: {
          name: "$profiles.name",
          photo: "$profiles.photo",
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        start: { $first: "$start" },
        end: { $first: "$end" },
        status: { $first: "$status" },
        ownerId: { $first: "$userId" },
        user: {
          $first: {
            name: { $first: { $first: "$profiles.name" } },
            photo: { $first: { $first: "$profiles.photo" } },
          },
        },
      },
    },
    { $sort: { start: 1 } },
  ]);

  return requests;
};
