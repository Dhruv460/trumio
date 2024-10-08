const Conversation = require("../models/conversation");
const Message = require("../models/message");
const User = require("../models/user");

exports.createConversation = async (req, res) => {
  const { recipientId } = req.body;
  const senderId = req.user._id;

  const existingConversation = await Conversation.findOne({
    participants: { $all: [senderId, recipientId] },
  });

  if (existingConversation) {
    return res.status(200).json(existingConversation);
  }

  const conversation = new Conversation({
    participants: [senderId, recipientId],
  });
  await conversation.save();

  res.status(201).json(conversation);
};

exports.getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: { $in: [req.user._id] },
    }).populate("participants", "name");

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching conversations",
      error: error.message,
    });
  }
};
