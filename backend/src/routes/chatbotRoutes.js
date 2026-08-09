const express = require("express");

const router = express.Router();

const {
  optionalProtect,
} = require("../middleware/authMiddleware");

const {
  chatWithBot,
} = require("../controllers/chatbotController");

// ================= AI Chatbot =================
router.post("/", optionalProtect, chatWithBot);

module.exports = router;