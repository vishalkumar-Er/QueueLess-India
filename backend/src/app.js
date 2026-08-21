const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const queueRoutes = require("./routes/queueRoutes");
const adminRoutes = require("./routes/adminRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "QueueLess India Backend Running 🚀",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/queues", queueRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/feedback", feedbackRoutes);

module.exports = app;