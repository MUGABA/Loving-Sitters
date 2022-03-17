const express = require("express");
const {
  createNotification,
  markNotificationRead,
  fetchAllNotifications,
  fetctAllUnreadNotifications,
} = require("../controllers/notification");
const router = express.Router();

const protect = require("../middleware/auth");
const {
  validateNotification,
  validateRequestParameter,
} = require("../validate");

router.route("/").post([protect, validateNotification], createNotification);

router
  .route("/read/:userId")
  .put([protect, validateRequestParameter], markNotificationRead);

router.route("/").get(protect, fetchAllNotifications);

router.route("/unread").get(protect, fetctAllUnreadNotifications);

module.exports = router;
