const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  assistant,
  getChatHistory,
} = require("../controllers/geminiController");
const router = express.Router();

router.post("/prompt", authMiddleware, assistant);

router.get("/chatHistory", authMiddleware, getChatHistory);
module.exports = router;
