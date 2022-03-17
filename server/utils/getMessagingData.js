const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
exports.getAllMessagesOnAConversation = async (conditions = {}) => {
  const messages = await Message.aggregate([
    { $match: { ...conditions } },
    {
      $lookup: {
        from: "profiles",
        localField: "senderId",
        foreignField: "_id",
        as: "profiles",
      },
    },

    {
      $project: {
        createdAt: "$createdAt",
        message: "$message",
        receiverId: "$receiverId",
        senderId: "$senderId",
        profiles: {
          name: "$profiles.name",
          photo: "$profiles.photo",
          isActive: "$profiles.isActive",
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        message: { $first: "$message" },
        createdAt: { $first: "$createdAt" },
        receiverId: { $first: "$receiverId" },
        senderId: { $first: "$senderId" },
        user: {
          $first: {
            name: { $first: { $first: "$profiles.name" } },
            photo: { $first: { $first: "$profiles.photo" } },
            isActive: { $first: { $first: "$profiles.isActive" } },
          },
        },
      },
    },
    { $sort: { createdAt: 1 } },
  ]);

  return messages;
};

exports.getAllConversations = async (conditions = {}) => {
  const conversations = await Conversation.aggregate([
    { $match: { ...conditions } },
    {
      $lookup: {
        from: "profiles",
        localField: "receiverId",
        foreignField: "_id",
        as: "profiles",
      },
    },
    {
      $project: {
        receiverId: "$receiverId",
        senderId: "$senderId",
        profiles: {
          name: "$profiles.name",
          photo: "$profiles.photo",
          isOnline: "$profiles.isOnline",
        },
        message: {
          message: "$messages.message",
          createdAt: "$messages.createdAt",
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        receiverId: { $first: "$receiverId" },
        senderId: { $first: "$senderId" },
        user: {
          $first: {
            name: { $first: { $first: "$profiles.name" } },
            photo: { $first: { $first: "$profiles.photo" } },
            isOnline: { $first: { $first: "$profiles.isOnline" } },
          },
        },
        message: {
          $first: {
            message: { $first: { $first: "$messages.message" } },
            createdAt: { $first: { $first: "$messages.createdAt" } },
          },
        },
      },
    },
    { $sort: { createdAt: -1 } },
    {
      $lookup: {
        as: "messages",
        let: { conversationId: "_id" },
        pipeline: [{ $sort: { createdAt: -1 } }, { $limit: 1 }],
        from: "messages",
      },
    },
    {
      $set: {
        message: { $arrayElemAt: ["$messages", 0] },
      },
    },
  ]);

  return conversations;
};

exports.getAllConversationsReceived = async (conditions = {}) => {
  const conversations = await Conversation.aggregate([
    { $match: { ...conditions } },
    {
      $lookup: {
        from: "profiles",
        localField: "senderId",
        foreignField: "_id",
        as: "profiles",
      },
    },
    {
      $project: {
        receiverId: "$receiverId",
        senderId: "$senderId",
        profiles: {
          name: "$profiles.name",
          photo: "$profiles.photo",
          isOnline: "$profiles.isOnline",
        },
        message: {
          message: "$messages.message",
          createdAt: "$messages.createdAt",
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        receiverId: { $first: "$receiverId" },
        senderId: { $first: "$senderId" },
        user: {
          $first: {
            name: { $first: { $first: "$profiles.name" } },
            photo: { $first: { $first: "$profiles.photo" } },
            isOnline: { $first: { $first: "$profiles.isOnline" } },
          },
        },
        message: {
          $first: {
            message: { $first: { $first: "$messages.message" } },
            createdAt: { $first: { $first: "$messages.createdAt" } },
          },
        },
      },
    },
    { $sort: { createdAt: -1 } },
    {
      $lookup: {
        as: "messages",
        let: { conversationId: "_id" },
        pipeline: [{ $sort: { createdAt: -1 } }, { $limit: 1 }],
        from: "messages",
      },
    },
    {
      $set: {
        message: { $arrayElemAt: ["$messages", 0] },
      },
    },
  ]);

  return conversations;
};
