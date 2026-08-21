const User = require("../models/User");
const Queue = require("../models/Queue");
const Feedback = require("../models/Feedback");

// ================= Dashboard Stats =================
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

    // ================= Today's Queues =================
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayQueues = await Queue.countDocuments({
      createdAt: { $gte: today },
    });

    // ================= Today's Completed Queues =================
    const todayCompletedQueues = await Queue.countDocuments({
      status: "Completed",
      createdAt: { $gte: today },
    });

    // ================= Department Wise Analytics =================
    const departmentStats = await Queue.aggregate([
      {
        $group: {
          _id: "$department",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      totalUsers,
      totalQueues,
      waitingQueues,
      completedQueues,
      cancelledQueues,
      todayQueues,
      todayCompletedQueues,
      departmentStats,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= Recent Queues =================
const getRecentQueues = async (req, res) => {
  try {
    const queues = await Queue.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json(queues);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ================= AI Feedback Insights =================
const getFeedbackInsights = async (req, res) => {
  try {

    const total = await Feedback.countDocuments();

    const positive = await Feedback.countDocuments({
      sentiment: "Positive",
    });

    const neutral = await Feedback.countDocuments({
      sentiment: "Neutral",
    });

    const negative = await Feedback.countDocuments({
      sentiment: "Negative",
    });
let overallSentiment = "No Feedback";

if (total > 0) {
  overallSentiment = "Neutral";

  if (positive > negative && positive > neutral) {
    overallSentiment = "Positive";
  } else if (negative > positive && negative > neutral) {
    overallSentiment = "Negative";
  }
}

    res.status(200).json({
      total,
      positive,
      neutral,
      negative,
      overallSentiment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  getDashboardStats,
  getRecentQueues,
  getFeedbackInsights,
};