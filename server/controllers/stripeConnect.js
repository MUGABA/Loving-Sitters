const User = require("../models/User");
const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");
const PetSitter = require("../models/PetSitter");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

// @route POST /connect/stripe
// @desc user connects to stripe and creates account link
// @access Public
exports.stripeConnect = asyncHandler(async (req, res, next) => {
  const { rate } = req.body;
  const userId = req.user.id;

  const currentUser = await User.findById(userId);
  const currentUserProfile = await Profile.findOne({ userId });

  let account;

  try {
    account = await stripe.accounts.create({
      type: "standard",
      country: "CA",
      email: currentUser.email,
      default_currency: "CAD",
      business_type: "individual",
      company: {
        name: currentUser.name,
      },
    });
  } catch (err) {
    res.status(500);
    throw new Error("Stripe account not created", err);
  }

  try {
    await stripe.accountLinks.create({
      account: account.id,
      refresh_url: process.env.REFRESH_URL_STRIPE,
      return_url: process.env.RETURN_URL_STRIPE,
      type: "account_onboarding",
    });
  } catch (err) {
    res.status(400);
    throw new Error("Stripe account link did not create", err);
  }

  const rateInCents = rate * 100;

  const petSitter = await PetSitter.create({
    stripeConnectId: account.id,
    rate: rateInCents,
    userId,
    stripeAccountId: currentUserProfile.stripeAccountId,
  });

  return res.status(201).send({ success: petSitter });
});
