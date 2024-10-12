const ChatHistory = require("../models/chatHistory");
const runn = require("../gemini");
exports.assistant = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.user._id;
    const chatHistory = await ChatHistory.findOne({ userId });
    const previousChats = chatHistory
      ? chatHistory.chats
          .map((chat) => ({
            role: "user",
            text: chat.prompt,
          }))
          .concat(
            chatHistory.chats.map((chat) => ({
              role: "model",
              text: chat.response,
            }))
          )
      : [];

    const response = await runn(prompt, previousChats);

    if (chatHistory) {
      chatHistory.chats.push({ prompt, response });
      await chatHistory.save();
    } else {
      const newChatHistory = new ChatHistory({
        userId,
        chats: [{ prompt, response }],
      });
      await newChatHistory.save();
    }

    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while generating the response.");
  }
};

exports.getChatHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const chatHistory = await ChatHistory.findOne({ userId });

    if (chatHistory) {
      res.json(chatHistory.chats);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while fetching chat history.");
  }
};
