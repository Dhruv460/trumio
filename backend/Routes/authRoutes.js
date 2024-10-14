const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const {
  register,
  login,
  getProfile,
  addBio,
} = require("../controllers/userController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);
router.put("/addbio", authMiddleware, addBio);
module.exports = router;
