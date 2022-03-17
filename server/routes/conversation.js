const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  createConversation,
  sendMessage,
  getAllConversations,
  getAllMessageByConversation,
} = require("../controllers/Conversation");
const {
  validateCreateConversation,
  validateSendMessage,
} = require("../validate");

router
  .route("/")
  .post([protect, validateCreateConversation], createConversation);

router.route("/").get(protect, getAllConversations);

router.route("/sendMessage").post([protect, validateSendMessage], sendMessage);

router
  .route("/getAllMessageByConversation/:conversationId")
  .get(protect, getAllMessageByConversation);

module.exports = router;
