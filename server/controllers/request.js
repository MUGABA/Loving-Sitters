const Request = require("../models/Request");
const asyncHandler = require("express-async-handler");
const Profile = require("../models/Profile");
const { getRequestsData } = require("../utils/fetchSitterJobs");
const mongoose = require("mongoose");

// @route GET /request
// @desc get requests related to a logged in user or sitter
// @access Private
exports.getRequest = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const sitterProfile = await Profile.findOne({ userId });

  const sitterProfileId = mongoose.Types.ObjectId(sitterProfile.id);
  const conditions = {
    sitterId: sitterProfileId,
  };

  const accepted = await getRequestsData({ ...conditions, status: "accepted" });
  const cancelled = await getRequestsData({
    ...conditions,
    status: "cancelled",
  });
  const pending = await getRequestsData({ ...conditions, status: "pending" });

  const requests = {
    accepted,
    cancelled,
    pending,
  };
  if (requests) {
    return res.status(200).send({ requests });
  } else {
    res.status(404).send("user id didn't exist.");
  }
});

// @route POST /request
// @desc post requests with user id and sitter id
// @access Private
exports.postRequest = asyncHandler(async (req, res) => {
  const { sitterId, start, end, offset } = req.body;
  const userId = req.user.id;

  const petOwnerProfile = await Profile.findOne({ userId });
  const sitter = await Profile.findById(sitterId);

  const petOwnerProfileId = petOwnerProfile.id;

  if (!sitter) {
    res.status(404);
    throw new Error("sitter does not exist");
  }

  const request = await Request.create({
    userId: petOwnerProfileId,
    sitterId,
    start,
    end,
    offset,
  });

  return res
    .status(201)
    .send({ success: { request, message: `request created successfully ` } });
});

// @route PUT /request/:id?status=approved or declined
// @desc update request status finding by id
// @access Private
exports.updateRequest = asyncHandler(async (req, res, next) => {
  const status = req.query.status;
  const requestId = req.params.id;

  const request = await Request.findByIdAndUpdate(requestId, { status });
  if (!request) {
    return res.status(404).send({ error: "request didn't exist." });
  }
  res.status(200).json({ success: { request } });
});
