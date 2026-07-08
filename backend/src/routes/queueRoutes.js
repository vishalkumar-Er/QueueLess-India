const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middleware/authMiddleware");

const {
  createQueue,
  getMyQueues,
  getAllQueues,
  updateQueueStatus,
  deleteQueue,
} = require("../controllers/queueController");

// ================= Create Queue =================
router.post("/", protect, createQueue);

// ================= Get All Queues (Admin Only) =================
router.get("/", protect, admin, getAllQueues);

// ================= Get My Queues =================
router.get("/my", protect, getMyQueues);

// ================= Update Queue Status (Admin Only) =================
router.put("/:id", protect, admin, updateQueueStatus);

// ================= Delete Queue (Admin Only) =================
router.delete("/:id", protect, admin, deleteQueue);

module.exports = router;