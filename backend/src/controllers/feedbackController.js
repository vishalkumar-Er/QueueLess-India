const Feedback = require("../models/Feedback");

// ================= Analyze Sentiment =================
const analyzeSentiment = (message) => {
  const text = message.toLowerCase();

  const positiveWords = [
    "good",
    "great",
    "excellent",
    "helpful",
    "easy",
    "fast",
    "smooth",
    "amazing",
    "love",
    "best",
    "nice",
    "happy",
    "useful",
    "awesome",
    "perfect",
  ];

  const negativeWords = [
    "bad",
    "poor",
    "slow",
    "late",
    "long",
    "difficult",
    "worst",
    "hate",
    "problem",
    "issue",
    "confusing",
    "unhappy",
    "terrible",
    "waste",
  ];

  let positiveScore = 0;
  let negativeScore = 0;

  positiveWords.forEach((word) => {
    if (text.includes(word)) {
      positiveScore++;
    }
  });

  negativeWords.forEach((word) => {
    if (text.includes(word)) {
      negativeScore++;
    }
  });

  if (positiveScore > negativeScore) {
    return "Positive";
  }

  if (negativeScore > positiveScore) {
    return "Negative";
  }

  return "Neutral";
};

// ================= Submit Feedback =================
const submitFeedback = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        message: "Feedback message is required.",
      });
    }

    const sentiment = analyzeSentiment(message);

    const feedback = await Feedback.create({
      user: req.user.id,
      message: message.trim(),
      sentiment,
    });

    res.status(201).json({
      message: "Feedback submitted successfully.",
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  submitFeedback,
};