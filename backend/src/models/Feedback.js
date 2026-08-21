const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    sentiment: {
      type: String,
      enum: ["Positive", "Neutral", "Negative"],
      default: "Neutral",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Feedback", feedbackSchema);