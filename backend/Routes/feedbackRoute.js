const express = require("express");
const { feedBack } = require("../controllers/feedback");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/feedback", authMiddleware, feedBack);

module.exports = router;
