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
} from "../../services/dashboardService";

import "./Dashboard.css";

interface Queue {
  _id: string;
  tokenNumber: number;
  department: string;
  status: string;
}

function Dashboard() {
  const navigate = useNavigate();

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

  const [queues, setQueues] = useState<Queue[]>([]);

  const chartData = stats.departmentStats.map((item: any) => ({
  department: item._id,
  total: item.total,
}));

// 👇 Iske niche paste karo
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

  useEffect(() => {
    fetchDashboard();
    fetchRecentQueues();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRecentQueues = async () => {
    try {
      const data = await getRecentQueues();
      setQueues(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  toast.success("Logout Successful 👋");

  setTimeout(() => {
    navigate("/");
  }, 1000);
};

  return (
    <div className="dashboard">

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

      <h2 className="welcome">
        Welcome 👋
      </h2>

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
                  <td>{queue.tokenNumber}</td>
                  <td>{queue.department}</td>
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

      <div className="recent" style={{ marginTop: "30px" }}>
  <h2>Department Analytics</h2>

  <ResponsiveContainer width="100%" height={350}>
    <BarChart data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="department" />
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

<div className="recent" style={{ marginTop: "30px" }}>
  <h2>Queue Status Analytics</h2>

  <ResponsiveContainer width="100%" height={350}>
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
            fill={COLORS[index % COLORS.length]}
          />
        ))}
      </Pie>

      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
</div>


    </div>
  );
}

export default Dashboard;