// const express = require("express");
// const {
//   sendMessage,
//   getMessages,
// } = require("../controllers/messageController");
// const authMiddleware = require("../middleware/authMiddleware");

// const router = express.Router();

// router.post("/send", authMiddleware, sendMessage);
// router.get("/:conversationId", authMiddleware, getMessages);

// module.exports = router;
const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  sendMessage,
  allMessages,
} = require("../controllers/messageController");

const router = express.Router();

router.post("/", authMiddleware, sendMessage);
router.get("/:chatId", authMiddleware, allMessages);

module.exports = router;
