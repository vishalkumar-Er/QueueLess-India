const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middleware/authMiddleware");

const {
  getDashboardStats,
  getRecentQueues,
} = require("../controllers/adminController");

// ================= Dashboard =================
router.get("/dashboard", protect, admin, getDashboardStats);

// ================= Recent Queues =================
router.get("/recent-queues", protect, admin, getRecentQueues);

module.exports = router;