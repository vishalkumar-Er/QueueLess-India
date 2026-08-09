import { createQueue } from "../../services/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./BookQueue.css";

function BookQueue() {
  const navigate = useNavigate();

  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBookQueue = async () => {
    if (!department) {
      toast.error("Please Select Department");
      return;
    }

    if (loading) {
      return;
    }

    try {
      setLoading(true);

      const data = await createQueue({
        department,
      });

      toast.success(data.message);

      setTimeout(() => {
        navigate("/user-dashboard");
      }, 1500);

    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
        "Failed To Book Queue"
      );

      setLoading(false);
    }
  };

  return (
    <div className="book-queue">

      {/* Header */}

      <div className="book-header">

        <h1>📋 Book New Queue</h1>

        <button
          className="back-btn"
          onClick={() => navigate("/user-dashboard")}
          disabled={loading}
        >
          ← Back
        </button>

      </div>

      {/* Booking Card */}

      <div className="book-card">

        <h2>Select Department</h2>

        <select
          value={department}
          onChange={(e) =>
            setDepartment(e.target.value)
          }
          disabled={loading}
        >
          <option value="">
            Choose Department
          </option>

          <option value="Bank">
            Bank
          </option>

          <option value="Hospital">
            Hospital
          </option>

          <option value="College">
            College
          </option>

          <option value="RTO">
            RTO
          </option>
        </select>

        <button
          className="book-btn"
          onClick={handleBookQueue}
          disabled={loading}
        >
          {loading ? "Booking..." : "Book Queue"}
        </button>

      </div>

    </div>
  );
}

export default BookQueue;