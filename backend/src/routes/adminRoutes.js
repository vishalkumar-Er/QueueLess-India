const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middleware/authMiddleware");
const { getDashboardStats } = require("../controllers/adminController");

// Admin Dashboard
router.get("/dashboard", protect, admin, getDashboardStats);

module.exports = router;