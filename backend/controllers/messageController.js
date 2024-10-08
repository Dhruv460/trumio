const Message = require("../models/message");
const Conversation = require("../models/conversation");

exports.sendMessage = async (req, res) => {
  const { conversationId, text } = req.body;
  const senderId = req.user._id;

  const conversation = await Conversation.findById(conversationId);
  if (!conversation || !conversation.participants.includes(senderId)) {
    return res.status(403).json({ message: "Not part of this conversation" });
  }

  const message = new Message({
    conversationId,
    sender: senderId,
    text,
  });

  await message.save();
  res.status(201).json(message);
};

exports.getMessages = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const messages = await Message.find({ conversationId })
      .sort({ createdAt: 1 })
      .populate("sender", "name");
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching messages",
      error: error.message,
    });
  }
};
