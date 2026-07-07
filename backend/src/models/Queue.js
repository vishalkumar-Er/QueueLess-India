const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema(
  {
    tokenNumber: {
      type: Number,
      required: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Waiting", "In Progress", "Completed", "Cancelled"],
      default: "Waiting",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Queue", queueSchema);