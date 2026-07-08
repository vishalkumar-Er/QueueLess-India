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

// ================= Delete Queue (Admin Only) =================
router.delete("/:id", protect, admin, deleteQueue);

module.exports = router;
