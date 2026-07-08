const User = require("../models/User");
const Queue = require("../models/Queue");

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalQueues = await Queue.countDocuments();

    const waitingQueues = await Queue.countDocuments({
      status: "Waiting",
    });

    const completedQueues = await Queue.countDocuments({
      status: "Completed",
    });

    const cancelledQueues = await Queue.countDocuments({
      status: "Cancelled",
    });

    res.status(200).json({
      totalUsers,
      totalQueues,
      waitingQueues,
      completedQueues,
      cancelledQueues,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};