const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    sitterId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    stripeCustomerId: {
      type: String,
      required: true,
    },
    paymentIntentId: {
      type: String,
      default: "",
    },
    rate: {
      type: Number,
      required: true,
    },
    hoursOfService: {
      type: Number,
      required: true,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    cancel: {
      type: Boolean,
      default: false,
    },
  },
  { toJSON: { virtuals: true } }
);

paymentSchema.virtual("totalPayment").get(function () {
  return this.hoursOfService * this.rate + 5;
});

module.exports = Payment = mongoose.model("Payment", paymentSchema);
