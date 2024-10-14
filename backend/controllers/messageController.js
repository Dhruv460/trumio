// const Message = require("../models/message");
// const Conversation = require("../models/conversation");

// exports.sendMessage = async (req, res) => {
//   const { conversationId, text } = req.body;
//   const senderId = req.user._id;

//   const conversation = await Conversation.findById(conversationId);
//   if (!conversation || !conversation.participants.includes(senderId)) {
//     return res.status(403).json({ message: "Not part of this conversation" });
//   }

//   const message = new Message({
//     conversationId,
//     sender: senderId,
//     text,
//   });

//   await message.save();
//   res.status(201).json(message);
// };

// exports.getMessages = async (req, res) => {
//   const { conversationId } = req.params;

//   try {
//     const messages = await Message.find({ conversationId })
//       .sort({ createdAt: 1 })
//       .populate("sender", "name");
//     res.status(200).json(messages);
//   } catch (error) {
//     res.status(500).json({
//       message: "Error fetching messages",
//       error: error.message,
//     });
//   }
// };
const asyncHandler = require("express-async-handler");
const Message = require("../models/mesageModel");
const User = require("../models/user");
const Chat = require("../models/chatModels");

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    console.log("Invalid Data Passed into Request");
    res.sendStatus(400);
  }
  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };
  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });
    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendMessage, allMessages };
