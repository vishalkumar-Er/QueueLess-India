import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalQueues: 0,
    waitingQueues: 0,
    completedQueues: 0,
  });

  const [queues, setQueues] = useState<Queue[]>([]);

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

    navigate("/");
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
                  <td>{queue.status}</td>
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

    </div>
  );
}

export default Dashboard;