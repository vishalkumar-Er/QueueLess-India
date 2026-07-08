const Queue = require("../models/Queue");

// ================= Create Queue =================
const createQueue = async (req, res) => {
  try {
    const { department } = req.body;

    // Find Last Token Number
   const lastQueue = await Queue.findOne({
  department,
}).sort({ tokenNumber: -1 });

    let tokenNumber = 1;

    if (lastQueue) {
      tokenNumber = lastQueue.tokenNumber + 1;
    }

    // Create New Queue
    const queue = await Queue.create({
      tokenNumber,
      department,
      user: req.user.id,
    });

    res.status(201).json({
      message: "Queue Created Successfully",
      queue,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Get My Queues =================
const getMyQueues = async (req, res) => {
  try {
    const queues = await Queue.find({
      user: req.user.id,
    });

    res.status(200).json({
      total: queues.length,
      queues,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Get All Queues (Admin Only) =================
const getAllQueues = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const keyword = req.query.search
      ? {
          department: {
            $regex: req.query.search,
            $options: "i",
          },
        }
      : {};

    const total = await Queue.countDocuments(keyword);

    const queues = await Queue.find(keyword)
      .populate("user", "name email role")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      total,
      page,
      pages: Math.ceil(total / limit),
      queues,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Update Queue Status =================
const updateQueueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const queue = await Queue.findById(id);

    if (!queue) {
      return res.status(404).json({
        message: "Queue Not Found",
      });
    }

    queue.status = status;

    await queue.save();

    res.status(200).json({
      message: "Queue Status Updated Successfully",
      queue,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Delete Queue =================
const deleteQueue = async (req, res) => {
  try {
    const { id } = req.params;

    const queue = await Queue.findById(id);

    if (!queue) {
      return res.status(404).json({
        message: "Queue Not Found",
      });
    }

    await Queue.findByIdAndDelete(id);

    res.status(200).json({
      message: "Queue Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Get Queue Position =================
const getQueuePosition = async (req, res) => {
  try {
    const { id } = req.params;

    // Find Queue
    const queue = await Queue.findById(id);

    if (!queue) {
      return res.status(404).json({
        message: "Queue Not Found",
      });
    }

    // Count Waiting Queues Before Current Token
    const peopleAhead = await Queue.countDocuments({
      department: queue.department,
      status: "Waiting",
      tokenNumber: { $lt: queue.tokenNumber },
    });

    res.status(200).json({
      department: queue.department,
      tokenNumber: queue.tokenNumber,
      status: queue.status,
      peopleAhead,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createQueue,
  getMyQueues,
  getAllQueues,
  updateQueueStatus,
  deleteQueue,
  getQueuePosition,
};