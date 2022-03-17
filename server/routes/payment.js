const express = require("express");
const protect = require("../middleware/auth");

const {
  getAllPayments,
  getPayment,
  makePayment,
  cancelPayment,
  createPayment,
  addPayment,
} = require("../controllers/payment");

const router = express.Router();

const {
  validateCreatePaymentRecord,
  validatePaymentId,
} = require("../validate");

router.route("/").get(protect, getAllPayments);

router.route("/").post([protect, validateCreatePaymentRecord], addPayment);

router.route("/:paymentId").get([protect, validatePaymentId], getPayment);

router.route("/:paymentId/pay").post([protect, validatePaymentId], makePayment);

router
  .route("/:paymentId/cancel")
  .put([protect, validatePaymentId], cancelPayment);

module.exports = router;
