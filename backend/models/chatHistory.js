const mongoose = require("mongoose");

const chatHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  chats: [
    {
      prompt: String,
      response: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});
const ChatHistory = mongoose.model("ChatHistory", chatHistorySchema);
module.exports = ChatHistory;
