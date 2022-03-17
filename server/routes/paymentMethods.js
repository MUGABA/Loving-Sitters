const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");

const { createPaymentMethod } = require("../controllers/paymentMethods");

router.route("/session").post(protect, createPaymentMethod);

module.exports = router;
