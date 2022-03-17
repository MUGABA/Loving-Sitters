const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const asyncHandler = require("express-async-handler");
const Profile = require("../models/Profile");
const {
  getAllMessagesOnAConversation,
  getAllConversations,
  getAllConversationsReceived,
} = require("../utils/getMessagingData");
const mongoose = require("mongoose");
const User = require("../models/User");

// @route POST /conversations/
// @desc create a new conversation
// @access Public
exports.createConversation = asyncHandler(async (req, res, next) => {
  const { receiverId, initialMessage } = req.body;

  const recieverProfile = await Profile.findById(receiverId);
  if (!recieverProfile) {
    res.status(404);
    throw new Error("This sitter does not exist");
  }

  const senderProfile = await Profile.findOne({ userId: req.user.id });
  const senderId = senderProfile.id;

  const conversationIsAvailable = await Conversation.findOne({
    receiverId,
    senderId,
  });

  let conversationId;

  const conversationIsAvailableSent = await Conversation.findOne({
    receiverId: senderId,
    senderId: receiverId,
  });

  if (conversationIsAvailable) conversationId = conversationIsAvailable.id;
  else conversationId = conversationIsAvailableSent.id;

  let message;

  if (conversationIsAvailable || conversationIsAvailableSent) {
    message = await Message.create({
      conversationId,
      senderId,
      receiverId,
      message: initialMessage,
    });
  } else {
    const conversation = await Conversation.create({
      receiverId,
      senderId,
    });

    message = await Message.create({
      conversationId: conversation.id,
      senderId,
      receiverId,
      message: initialMessage,
    });
  }

  return res.status(201).send({
    success: {
      message,
    },
  });
});

// @route GET /conversation/getAllMessageByConversation
// @desc get all messages from a single conversation
// @access Public
exports.getAllMessageByConversation = asyncHandler(async (req, res, next) => {
  const { conversationId } = req.params;

  const sentConditions = {
    conversationId: mongoose.Types.ObjectId(conversationId),
  };

  const messagesReceived = await getAllMessagesOnAConversation(sentConditions);

  const conversations = [...messagesReceived].sort(
    (i, j) => new Date(i.createdAt) - new Date(j.createdAt)
  );

  res.status(200).json({
    success: {
      messages: conversations,
    },
  });
});

// @route POST /conversation/sendMessage
// @desc send a message to a conversation
// @access Private
exports.sendMessage = asyncHandler(async (req, res, next) => {
  const { receiverId, message } = req.body;

  const senderProfile = await Profile.findOne({ userId: req.user.id });
  const senderId = senderProfile.id;

  const conversationSent = await Conversation.findOne({
    receiverId,
    senderId,
  });

  const conversationRecieved = await Conversation.findOne({
    receiverId: senderId,
    senderId: receiverId,
  });
  let messages;

  let conversationId;
  if (conversationSent) conversationId = conversationSent.id;
  else conversationId = conversationRecieved.id;

  if (!conversationSent && !conversationRecieved) {
    const conversation = await Conversation.create({
      receiverId,
      senderId,
    });

    messages = await Message.create({
      conversationId: conversation.id,
      senderId,
      receiverId,
      message: message,
    });
  } else {
    messages = await Message.create({
      conversationId,
      senderId,
      receiverId,
      message: message,
    });
  }

  res.status(200).send({
    success: {
      message: messages,
    },
  });
});

// @route GET /conversations/
// @desc get all conversations for a user
// @access Private
exports.getAllConversations = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ userId: req.user.id });

  const senderConditions = {
    senderId: mongoose.Types.ObjectId(profile.id),
  };

  const receiverConditions = {
    receiverId: mongoose.Types.ObjectId(profile.id),
  };

  const senderConversations = await getAllConversations(senderConditions);

  const receiverConversations = await getAllConversationsReceived(
    receiverConditions
  );

  const conversations = [...senderConversations, ...receiverConversations];

  res.status(200).json({
    success: {
      conversations,
    },
  });
});
