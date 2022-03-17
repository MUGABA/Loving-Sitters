const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const Payment = require("../models/payment");

// @route POST /payments/
// @desc add payment
// @access Private
exports.addPayment = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const { sitterId, rate, startTime, endTime } = req.body;

  const sitterProfile = await Profile.findById(sitterId);
  const currentUser = await Profile.findOne({ userId });
  if (!sitterProfile) {
    res.status(404);
    throw new Error("Sitter does not exist");
  }

  const sitterStripeAccountId = sitterProfile.stripeAccountId;
  const hoursOfService = endTime - startTime;

  const ownerStripeAccountId = currentUser.stripeAccountId;

  const paymentIntent = await stripe.paymentIntents.create({
    customer: ownerStripeAccountId,
    payment_method_types: ["card"],
    amount: hoursOfService * rate + 5,
    currency: "cad",
    transfer_data: {
      destination: sitterProfile.stripeConnectId,
    },
  });

  const createPayment = await Payment.create({
    sitterId,
    userId,
    stripeCustomerId: sitterStripeAccountId,
    paymentIntentId: paymentIntent.id,
    rate,
    hoursOfService,
  });

  if (!createPayment) {
    res.status(400);
    throw new Error("Invalid Data");
  }
  return res.status(200).send({
    success: {
      payment: createPayment,
    },
  });
});

// @route GET /payments/:paymentId
// @desc fetch payment record by id
// @access Private
exports.getPayment = asyncHandler(async (req, res, next) => {
  const paymentId = req.params.paymentId;
  const payment = await Payment.findById(paymentId);
  if (!payment) {
    res.status(404);
    throw new Error("Payment not found");
  }
  return res.status(200).send({
    success: {
      payment,
    },
  });
});

// @route Post /payments/:paymentId/pay
// @desc Make a payment
// @access Private
exports.makePayment = asyncHandler(async (req, res, next) => {
  const paymentId = req.params.paymentId;
  const userId = req.user.id;

  const payment = await Payment.findOne({ userId: userId, id: paymentId });

  if (!payment) {
    res.status(404);
    throw new Error("Payment doesn't exist");
  }

  const { totalPayment, stripeAccountId } = payment;

  try {
    await stripe.paymentIntents.confirm(payment.paymentIntentId);
  } catch (error) {
    res.status(500);
    throw new Error("Payment was not completed");
  }

  payment.set({ paid: true });

  const updatedPayment = await payment.save();

  if (updatedPayment) {
    return res.status(200).send({
      success: {
        payment: updatedPayment,
        msg: "Payment Completed",
      },
    });
  }
});

// @route PUT /payments/:paymentId/cancel
// @desc cancel a payment
// @access Private
exports.cancelPayment = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const paymentId = req.params.paymentId;

  const payment = await Payment.findOne({ id: paymentId, sitterId: userId });

  if (!payment) {
    res.status(404);
    throw new Error("Only merchant can cancel");
  }

  try {
    await stripe.paymentIntents.cancel(payment.paymentIntentId);
  } catch (error) {
    res.status(500);
    throw new Error("Payment was not completed");
  }

  payment.set({ cancel: true });

  const updatedPayment = await payment.save();

  if (updatedPayment) {
    return res.status(200).send({
      success: {
        payment: updatedPayment,
      },
    });
  }
});

// @route GET /payments/
// @desc fetch all Payments
// @access Private
exports.getAllPayments = asyncHandler(async (req, res, next) => {
  const payments = await Payment.find({ userId: req.user.id });

  return res.status(200).send({
    success: {
      payments,
    },
  });
});
