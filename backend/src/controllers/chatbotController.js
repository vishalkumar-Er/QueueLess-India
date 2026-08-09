const Queue = require("../models/Queue");

// ================= AI Queue Assistant =================
const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;

    // ================= Message Validation =================
    if (!message || !message.trim()) {
      return res.status(400).json({
        message: "Please enter a message.",
      });
    }

    const query = message.toLowerCase().trim();

    // =====================================================
    // 🌐 PUBLIC / LANDING PAGE QUESTIONS
    // These questions work WITHOUT LOGIN
    // =====================================================

    // 1. How does QueueLess work?
    if (
      query.includes("how does queueless work") ||
      query.includes("how queueless work") ||
      query.includes("how does queue work") ||
      query.includes("how this works")
    ) {
      return res.status(200).json({
        reply:
          "QueueLess India allows you to book a queue online, receive a digital token, track your queue position, view estimated waiting time, and monitor your queue status without standing in a physical line.",
      });
    }

    // 2. How to create/book a queue?
    if (
      query.includes("how to create queue") ||
      query.includes("how to book queue") ||
      query.includes("how can i create queue") ||
      query.includes("how can i book queue") ||
      query.includes("how do i book a queue")
    ) {
      return res.status(200).json({
        reply:
          "To create a queue, sign up or login to QueueLess India, go to Book Queue, select your department, and confirm your booking. Your digital token will be generated automatically.",
      });
    }

    // 3. What is QueueLess India?
    if (
      query.includes("what is queueless") ||
      query.includes("what is queueless india") ||
      query.includes("about queueless")
    ) {
      return res.status(200).json({
        reply:
          "QueueLess India is a smart queue management platform that helps users book queues online, receive digital tokens, track their position, and reduce physical waiting time.",
      });
    }

    // 4. Benefits of QueueLess
    if (
      query.includes("benefits of queueless") ||
      query.includes("what are the benefits") ||
      query.includes("why use queueless")
    ) {
      return res.status(200).json({
        reply:
          "QueueLess India helps you avoid long physical queues, book your queue online, track your position in real time, view estimated waiting time, and receive important queue updates.",
      });
    }

    // 5. Token system
    if (
      query.includes("how does the token system work") ||
      query.includes("how does token system work") ||
      query.includes("how token works") ||
      query.includes("token system")
    ) {
      return res.status(200).json({
        reply:
          "After booking a queue, QueueLess India automatically generates a digital token for you. You can use this token to track your position and estimated waiting time until your turn.",
      });
    }

    // 6. Live queue tracking
    if (
      query.includes("how does live queue tracking work") ||
      query.includes("how live queue tracking works") ||
      query.includes("live queue tracking") ||
      query.includes("track queue")
    ) {
      return res.status(200).json({
        reply:
          "Live queue tracking lets you monitor your token position, people ahead of you, queue status, and estimated waiting time in real time.",
      });
    }

    // 7. Physical waiting
    if (
      query.includes("do i need to wait physically") ||
      query.includes("do i need to wait in queue") ||
      query.includes("need to wait physically") ||
      query.includes("physical queue")
    ) {
      return res.status(200).json({
        reply:
          "No. QueueLess India is designed to reduce physical waiting. You can book your queue online and track your position so you can visit when your turn is approaching.",
      });
    }

    // 8. After token is called
    if (
      query.includes("what should i do after my token") ||
      query.includes("what to do after my token") ||
      query.includes("after my token is called") ||
      query.includes("token is called")
    ) {
      return res.status(200).json({
        reply:
          "When your token is called, please proceed to the assigned counter or department and wait for your turn.",
      });
    }

    // =====================================================
    // 🔐 AUTHENTICATION CHECK
    // Personal queue information requires login
    // =====================================================

    if (!req.user) {
      return res.status(200).json({
        reply:
          "🔐 Please login to view your personal queue details.",
      });
    }

    // =====================================================
    // 👤 USER DASHBOARD / PERSONAL QUEUE
    // =====================================================

    // 1. My Token Number
    if (
      query.includes("my token") ||
      query.includes("token number") ||
      query.includes("what is my token")
    ) {
      const queue = await Queue.findOne({
        user: req.user.id,
        status: {
          $in: ["Waiting", "In Progress"],
        },
      }).sort({ createdAt: -1 });

      if (!queue) {
        return res.status(200).json({
          reply: "You don't have an active queue right now.",
        });
      }

      return res.status(200).json({
        reply: `Your token number is ${queue.tokenNumber}. Your department is ${queue.department}.`,
      });
    }

    // 2. People Ahead
    if (
      query.includes("people ahead") ||
      query.includes("how many people") ||
      query.includes("how many people ahead") ||
      query.includes("my position")
    ) {
      const queue = await Queue.findOne({
        user: req.user.id,
        status: {
          $in: ["Waiting", "In Progress"],
        },
      }).sort({ createdAt: -1 });

      if (!queue) {
        return res.status(200).json({
          reply: "You don't have an active queue right now.",
        });
      }

      const peopleAhead = await Queue.countDocuments({
        department: queue.department,
        status: "Waiting",
        tokenNumber: {
          $lt: queue.tokenNumber,
        },
      });

      return res.status(200).json({
        reply: `There are ${peopleAhead} people ahead of you in the ${queue.department} queue.`,
      });
    }

    // 3. Estimated Waiting Time
    if (
      query.includes("estimated time") ||
      query.includes("waiting time") ||
      query.includes("when will my turn") ||
      query.includes("when is my turn") ||
      query.includes("when will my number come")
    ) {
      const queue = await Queue.findOne({
        user: req.user.id,
        status: {
          $in: ["Waiting", "In Progress"],
        },
      }).sort({ createdAt: -1 });

      if (!queue) {
        return res.status(200).json({
          reply: "You don't have an active queue right now.",
        });
      }

      const peopleAhead = await Queue.countDocuments({
        department: queue.department,
        status: "Waiting",
        tokenNumber: {
          $lt: queue.tokenNumber,
        },
      });

      const estimatedTime = peopleAhead * 5;

      return res.status(200).json({
        reply:
          estimatedTime === 0
            ? "Your turn is next or your token is currently being served."
            : `Your estimated waiting time is approximately ${estimatedTime} minutes.`,
      });
    }

    // 4. Queue Status
    if (
      query.includes("queue status") ||
      query.includes("my status") ||
      query.includes("status of my queue")
    ) {
      const queue = await Queue.findOne({
        user: req.user.id,
      }).sort({ createdAt: -1 });

      if (!queue) {
        return res.status(200).json({
          reply: "You don't have any queue history.",
        });
      }

      return res.status(200).json({
        reply: `Your latest queue status is ${queue.status}. Department: ${queue.department}, Token: ${queue.tokenNumber}.`,
      });
    }

    // 5. My Department
    if (
      query.includes("which department") ||
      query.includes("my department") ||
      query.includes("what department") ||
      query.includes("department is my queue")
    ) {
      const queue = await Queue.findOne({
        user: req.user.id,
        status: {
          $in: ["Waiting", "In Progress"],
        },
      }).sort({ createdAt: -1 });

      if (!queue) {
        return res.status(200).json({
          reply: "You don't have an active queue right now.",
        });
      }

      return res.status(200).json({
        reply: `Your queue is for the ${queue.department} department.`,
      });
    }

    // 6. Cancel Queue
    if (
      query.includes("cancel my queue") ||
      query.includes("cancel queue") ||
      query.includes("how can i cancel my queue") ||
      query.includes("how to cancel queue")
    ) {
      const queue = await Queue.findOne({
        user: req.user.id,
        status: {
          $in: ["Waiting", "In Progress"],
        },
      }).sort({ createdAt: -1 });

      if (!queue) {
        return res.status(200).json({
          reply: "You don't have an active queue to cancel.",
        });
      }

      return res.status(200).json({
        reply:
          "To cancel your queue, go to your Current Queue section and click the Cancel button. Your queue will be cancelled.",
      });
    }

    // =====================================================
    // DEFAULT RESPONSE
    // =====================================================

    return res.status(200).json({
      reply:
        "I'm your QueueLess Assistant 🤖. You can ask me about QueueLess, booking a queue, token system, live queue tracking, or your personal queue details.",
    });

  } catch (error) {
    console.log("Chatbot Error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  chatWithBot,
};