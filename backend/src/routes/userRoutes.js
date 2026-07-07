const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middleware/authMiddleware");
const { getProfile, adminDashboard } = require("../controllers/userController");

// User Profile
router.get("/profile", protect, getProfile);

// Admin Route
router.get("/admin", protect, admin, adminDashboard);

module.exports = router;