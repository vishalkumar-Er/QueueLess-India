const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middleware/authMiddleware");

const {
  createQueue,
  getMyQueues,
  getAllQueues,
  updateQueueStatus,
  deleteQueue,
  getQueuePosition,
  getEstimatedTime,
} = require("../controllers/queueController");

// ================= Create Queue =================
router.post("/", protect, createQueue);

// ================= Get My Queues =================
router.get("/my", protect, getMyQueues);

// ================= Get All Queues (Admin Only) =================
router.get("/", protect, admin, getAllQueues);

// ================= Update Queue Status (Admin Only) =================
router.put("/:id", protect, admin, updateQueueStatus);

// ================= Get Queue Position =================
router.get("/position/:id", protect, getQueuePosition);

// ================= Get Estimated Waiting Time =================
router.get("/estimated-time/:id", protect, getEstimatedTime);

// ================= Delete Queue (Admin Only) =================
router.delete("/:id", protect, admin, deleteQueue);

module.exports = router;