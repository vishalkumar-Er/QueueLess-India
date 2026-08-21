import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getDashboardStats,
  getRecentQueues,
  getFeedbackInsights,
} from "../../services/dashboardService";

import "./Dashboard.css";

interface Queue {
  _id: string;
  tokenNumber: number;
  department: string;
  status: string;
}

interface FeedbackInsights {
  total: number;
  positive: number;
  neutral: number;
  negative: number;
  overallSentiment: string;
}

function Dashboard() {
  const navigate = useNavigate();

  // ================= Dashboard Stats =================

  const [stats, setStats] = useState<any>({
    totalUsers: 0,
    totalQueues: 0,
    waitingQueues: 0,
    completedQueues: 0,
    cancelledQueues: 0,
    todayQueues: 0,
    todayCompletedQueues: 0,
    departmentStats: [],
  });

  // ================= Recent Queues =================

  const [queues, setQueues] = useState<Queue[]>([]);

  // ================= AI Feedback Insights =================

  const [feedbackInsights, setFeedbackInsights] =
    useState<FeedbackInsights>({
      total: 0,
      positive: 0,
      neutral: 0,
      negative: 0,
      overallSentiment: "No Feedback",
    });

  // ================= Department Chart Data =================

  const chartData = stats.departmentStats.map((item: any) => ({
    department: item._id,
    total: item.total,
  }));

  // ================= Queue Status Chart Data =================

  const pieData = [
    {
      name: "Waiting",
      value: stats.waitingQueues,
    },
    {
      name: "Completed",
      value: stats.completedQueues,
    },
    {
      name: "Cancelled",
      value: stats.cancelledQueues,
    },
  ];

  const COLORS = [
    "#f59e0b",
    "#22c55e",
    "#ef4444",
  ];

  // ================= Load Dashboard =================

  useEffect(() => {
    fetchDashboard();
    fetchRecentQueues();
    fetchFeedbackInsights();
  }, []);

  // ================= Fetch Dashboard Stats =================

  const fetchDashboard = async () => {
    try {
      const data = await getDashboardStats();

      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= Fetch Recent Queues =================

  const fetchRecentQueues = async () => {
    try {
      const data = await getRecentQueues();

      setQueues(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= Fetch AI Feedback Insights =================

  const fetchFeedbackInsights = async () => {
    try {
      const data = await getFeedbackInsights();

      setFeedbackInsights(data);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= Logout =================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logout Successful 👋");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  // ================= UI =================

  return (
    <div className="dashboard">

      {/* ================= Header ================= */}

      <header className="dashboard-header">

        <div>
          <h1>📋 QueueLess India</h1>
          <p>Admin Dashboard</p>
        </div>

        <div className="header-buttons">

          <button
            className="manage-btn"
            onClick={() => navigate("/queue-management")}
          >
            Queue Management
          </button>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>

      {/* ================= Welcome ================= */}

      <h2 className="welcome">
        Welcome 👋
      </h2>

      {/* ================= Dashboard Cards ================= */}

      <div className="cards">

        <div className="card">
          <h3>Total Users</h3>
          <h1>{stats.totalUsers}</h1>
        </div>

        <div className="card">
          <h3>Total Queues</h3>
          <h1>{stats.totalQueues}</h1>
        </div>

        <div className="card">
          <h3>Waiting</h3>
          <h1>{stats.waitingQueues}</h1>
        </div>

        <div className="card">
          <h3>Completed</h3>
          <h1>{stats.completedQueues}</h1>
        </div>

        <div className="card">
          <h3>Cancelled</h3>
          <h1>{stats.cancelledQueues}</h1>
        </div>

        <div className="card">
          <h3>Today's Queues</h3>
          <h1>{stats.todayQueues}</h1>
        </div>

        <div className="card">
          <h3>Today's Completed</h3>
          <h1>{stats.todayCompletedQueues}</h1>
        </div>

      </div>

      {/* ================= Recent Queues ================= */}

      <div className="recent">

        <h2>Recent Queues</h2>

        <table>

          <thead>
            <tr>
              <th>Token</th>
              <th>Department</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {queues.length > 0 ? (

              queues.map((queue) => (

                <tr key={queue._id}>

                  <td>
                    {queue.tokenNumber}
                  </td>

                  <td>
                    {queue.department}
                  </td>

                  <td>

                    <span
                      className={`status-badge ${
                        queue.status === "Completed"
                          ? "status-completed"
                          : "status-waiting"
                      }`}
                    >
                      {queue.status}
                    </span>

                  </td>

                </tr>

              ))

            ) : (

              <tr>
                <td colSpan={3}>
                  No Recent Queues Found
                </td>
              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* ================= Department Analytics ================= */}

      <div
        className="recent"
        style={{ marginTop: "30px" }}
      >

        <h2>
          Department Analytics
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <BarChart data={chartData}>

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="department"
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="total"
              fill="#3b82f6"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* ================= Queue Status Analytics ================= */}

      <div
        className="recent"
        style={{ marginTop: "30px" }}
      >

        <h2>
          Queue Status Analytics
        </h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >

          <PieChart>

            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >

              {pieData.map((_, index) => (

                <Cell
                  key={index}
                  fill={
                    COLORS[index % COLORS.length]
                  }
                />

              ))}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

      {/* ================= AI Feedback Insights ================= */}

      <div
        className="recent"
        style={{ marginTop: "30px" }}
      >

        <h2>
          🤖 AI Feedback Insights
        </h2>

        <div className="cards">

          {/* Total Feedback */}

          <div className="card">

            <h3>
              Total Feedback
            </h3>

            <h1>
              {feedbackInsights.total}
            </h1>

          </div>

          {/* Positive */}

          <div className="card">

            <h3>
              😊 Positive
            </h3>

            <h1>
              {feedbackInsights.positive}
            </h1>

          </div>

          {/* Neutral */}

          <div className="card">

            <h3>
              😐 Neutral
            </h3>

            <h1>
              {feedbackInsights.neutral}
            </h1>

          </div>

          {/* Negative */}

          <div className="card">

            <h3>
              😞 Negative
            </h3>

            <h1>
              {feedbackInsights.negative}
            </h1>

          </div>

        </div>

        {/* Overall Sentiment */}

        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >

          <h3>
            Overall Sentiment
          </h3>

          <h2>

            {feedbackInsights.overallSentiment ===
            "Positive"
              ? "😊 Positive"

              : feedbackInsights.overallSentiment ===
                "Negative"
              ? "😞 Negative"

              : feedbackInsights.overallSentiment ===
                "Neutral"
              ? "😐 Neutral"

              : "📊 No Feedback"}

          </h2>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;