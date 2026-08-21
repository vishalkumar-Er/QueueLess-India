const express = require("express");

const router = express.Router();

const { protect, admin } = require("../middleware/authMiddleware");

const {
  getDashboardStats,
  getRecentQueues,
  getFeedbackInsights,
} = require("../controllers/adminController");

// ================= Dashboard =================
router.get("/dashboard", protect, admin, getDashboardStats);

// ================= Recent Queues =================
router.get("/recent-queues", protect, admin, getRecentQueues);

// ================= AI Feedback Insights =================
router.get(
  "/feedback-insights",
  protect,
  admin,
  getFeedbackInsights
);

module.exports = router;