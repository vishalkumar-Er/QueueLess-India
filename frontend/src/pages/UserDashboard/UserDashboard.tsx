import Chatbot from "../../components/Chatbot/Chatbot";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getMyQueues,
  getQueuePosition,
  getEstimatedTime,
  getQueueHistory,
} from "../../services/authService";
import { submitFeedback } from "../../services/feedbackService";


import "./UserDashboard.css";

function UserDashboard() {
  const navigate = useNavigate();

  const [myQueue, setMyQueue] = useState<any>(null);

  const [peopleAhead, setPeopleAhead] = useState(0);

  const [estimatedTime, setEstimatedTime] = useState("");

  const [history, setHistory] = useState<any[]>([]);

// ================= Feedback States =================
const [feedbackMessage, setFeedbackMessage] = useState("");
const [feedbackLoading, setFeedbackLoading] = useState(false);


  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  // ================= Fetch Data =================

  useEffect(() => {
    fetchMyQueue();

    fetchQueueHistory();

    const interval = setInterval(() => {
      fetchMyQueue();

      fetchQueueHistory();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ================= Current Queue =================

  const fetchMyQueue = async () => {
    try {
      const data = await getMyQueues();

      if (data.queues.length > 0) {
        const queue = data.queues[0];

        setMyQueue(queue);

        const position =
          await getQueuePosition(queue._id);

        setPeopleAhead(position.peopleAhead);

        const time =
          await getEstimatedTime(queue._id);

        setEstimatedTime(
          time.estimatedTime
        );
      } else {
        setMyQueue(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ================= Queue History =================

  const fetchQueueHistory = async () => {
    try {
      const data =
        await getQueueHistory();

      setHistory(data.queues);
    } catch (error) {
      console.log(error);
    }
  };


  // ================= Submit Feedback =================

  const handleFeedbackSubmit = async () => {
    if (!feedbackMessage.trim()) {
      toast.error(
        "Please enter your feedback."
      );

      return;
    }

    try {
      setFeedbackLoading(true);

      await submitFeedback(
        feedbackMessage
      );

      toast.success(
        "Feedback submitted successfully! 😊"
      );

      setFeedbackMessage("");

    } catch (error: any) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to submit feedback."
      );

    } finally {
      setFeedbackLoading(false);
    }
  };

  // ================= Logout =================

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    toast.success(
      "Logout Successful 👋"
    );

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="user-dashboard">

      {/* ================= Header ================= */}

      <header className="user-header">

        <div>

          <h1>
            📋 QueueLess India
          </h1>

          <p>
            Smart Queue Management Platform
          </p>

          <Chatbot />

        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </header>

      {/* ================= Welcome Card ================= */}

      <div className="welcome-card">

        <h2>
          Welcome, {user.name} 👋
        </h2>

        <p>
          Track your queue status in real time.
        </p>

      </div>

      {/* ================= Current Queue ================= */}

      <div className="queue-card">

        <h3>
          🎟 Current Queue
        </h3>

        {myQueue ? (

          <div className="queue-details">

            <div className="queue-item">

              <span>
                🏢 Department
              </span>

              <strong>
                {myQueue.department}
              </strong>

            </div>

            <div className="queue-item">

              <span>
                🎫 Token Number
              </span>

              <strong>
                #{myQueue.tokenNumber}
              </strong>

            </div>

            <div className="queue-item">

              <span>
                📍 Status
              </span>

              <span
                className={`status-badge ${
                  myQueue.status ===
                  "Completed"
                    ? "status-completed"
                    : "status-waiting"
                }`}
              >
                {myQueue.status}
              </span>

            </div>

            <div className="queue-item">

              <span>
                👥 People Ahead
              </span>

              <strong>
                {peopleAhead}
              </strong>

            </div>

            <div className="queue-item">

              <span>
                ⏱ Estimated Time
              </span>

              <strong>
                {estimatedTime}
              </strong>

            </div>

          </div>

        ) : (

          <div className="empty-state">

            <h3>
              🎉 No Active Queue
            </h3>

            <p>
              You don't have any active queue.
            </p>

            <button
              className="book-btn"
              onClick={() =>
                navigate("/book-queue")
              }
            >
              ➕ Book New Queue
            </button>

          </div>

        )}

      </div>

      {/* ================= Queue History ================= */}

      <div
        className="queue-card"
        style={{
          marginTop: "30px",
        }}
      >

        <h3>
          📜 Queue History
        </h3>

                {history.length > 0 ? (

          history.map((queue) => (

            <div
              key={queue._id}
              className="history-card"
            >

              <div className="history-row">

                <span>
                  🏢 Department
                </span>

                <strong>
                  {queue.department}
                </strong>

              </div>

              <div className="history-row">

                <span>
                  🎫 Token
                </span>

                <strong>
                  #{queue.tokenNumber}
                </strong>

              </div>

              <div className="history-row">

                <span>
                  📍 Status
                </span>

                <span
                  className={`status-badge ${
                    queue.status ===
                    "Completed"
                      ? "status-completed"
                      : "status-waiting"
                  }`}
                >
                  {queue.status}
                </span>

              </div>

            </div>

          ))

        ) : (

          <div className="empty-state">

            <h3>
              📭 No Queue History
            </h3>

            <p>
              Your completed queues will
              appear here.
            </p>

          </div>

        )}

      </div>

      {/* ================= Feedback Section ================= */}

      <div
        className="queue-card feedback-card"
        style={{
          marginTop: "30px",
        }}
      >

        <h3>
          💬 Share Your Feedback
        </h3>

        <p>
          Tell us about your QueueLess India
          experience.
        </p>

        <textarea
          value={feedbackMessage}
          onChange={(e) =>
            setFeedbackMessage(
              e.target.value
            )
          }
          placeholder="Write your feedback here..."
          rows={5}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            resize: "vertical",
            fontSize: "15px",
            boxSizing: "border-box",
          }}
        />

        <button
          className="book-btn"
          onClick={handleFeedbackSubmit}
          disabled={feedbackLoading}
          style={{
            marginTop: "15px",
          }}
        >
          {feedbackLoading
            ? "Submitting..."
            : "Submit Feedback"}
        </button>

      </div>

    </div>
  );
}

export default UserDashboard;