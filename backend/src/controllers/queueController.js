const Queue = require("../models/Queue");

// ================= Create Queue =================
const createQueue = async (req, res) => {
  try {
    const { tokenNumber, department } = req.body;

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

module.exports = {
  createQueue,
  getMyQueues,
  updateQueueStatus,
  deleteQueue,
};