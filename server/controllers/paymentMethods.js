const User = require("../models/User");
const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

// @route POST /payment_methods/session
// @desc This will create a payment method
// @access Private
exports.createPaymentMethod = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const userProfle = await Profile.findOne({ userId });

  let session;
  try {
    session = await stripe.checkout.sessions.create({
      success_url: process.env.RETURN_URL_STRIPE,
      cancel_url: process.env.REFRESH_URL_STRIPE,
      payment_method_types: ["card"],
      mode: "setup",
      customer: userProfle.stripeAccountId,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Checkout session not created");
  }

  const { url, id } = session;

  res.send({ url });

  try {
    const setupIntent = await stripe.setupIntents.create({
      customer: userProfle.stripeAccountId,
      payment_method_types: ["card"],
    });
  } catch (error) {
    res.status(400);
    throw new Error("SetupIntent not created");
  }
});
