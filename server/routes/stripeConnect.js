const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth");

const { stripeConnect } = require("../controllers/stripeConnect");

router.route("/connect").post(protect, stripeConnect);

module.exports = router;
