import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllQueues,
  updateQueueStatus,
  deleteQueue,
  callNextToken,
} from "../../services/dashboardService";

import "./QueueManagement.css";

function QueueManagement() {
  const navigate = useNavigate();

  const [queues, setQueues] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");

const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const [loading, setLoading] = useState(false);

useEffect(() => {
  fetchQueues();
}, [search, department, page]);

const fetchQueues = async () => {
  try {
    setLoading(true);
    const keyword =
  department === "All" ? search : department;

const data = await getAllQueues(keyword, page);

    setQueues(data.queues);
    setTotalPages(data.pages);
    setLoading(false);

  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

  const handleComplete = async (id: string) => {
    try {
      await updateQueueStatus(id, "Completed");

toast.success("Queue Completed Successfully ✅");

fetchQueues();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this queue?"
    );

    if (!confirmDelete) return;

    try {
      await deleteQueue(id);
      toast.success("Queue Deleted Successfully 🗑️");


      fetchQueues();
    } catch (error) {
      console.log(error);
    }
  };

      const handleCallNext = async () => {
  try {
    if (department === "All") {
      toast.error("Please select a department first.");
      return;
    }

    await callNextToken(department);

    toast.success("Next Token Called Successfully 🎉");

    fetchQueues();
  } catch (error: any) {
    toast.error(
      error.response?.data?.message ||
      "No Waiting Queue Found"
    );
  }
};

  return (
    <div className="queue-management">

      <div className="queue-header">

        <h1>📋 Queue Management</h1>

        <button
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          ← Back
        </button>

      </div>

      <div
  style={{
    marginBottom: "20px",
    display: "flex",
    gap: "15px",
    alignItems: "center",
  }}
>
  <input
    type="text"
    placeholder="Search Department..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      width: "300px",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "15px",
    }}
  />

  <select
    value={department}
    onChange={(e) => setDepartment(e.target.value)}
    style={{
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "15px",
    }}
  >
    <option value="All">All Departments</option>
    <option value="Bank">Bank</option>
    <option value="Hospital">Hospital</option>
    <option value="College">College</option>
    <option value="RTO">RTO</option>
  </select>
</div>

<div style={{ marginBottom: "20px" }}>
<button
  className="call-next-btn"
  onClick={handleCallNext}
>
  ▶ Call Next Token
</button>
</div>

      <div className="queue-table">

        <table>

          <thead>
            <tr>
              <th>Token</th>
              <th>User</th>
              <th>Department</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

           {loading ? (

<tr>
  <td colSpan={5}>
    Loading Queues...
  </td>
</tr>

) : queues.length > 0 ? (

              queues.map((queue) => (

                <tr key={queue._id}>

                  <td>{queue.tokenNumber}</td>

                  <td>{queue.user?.name}</td>

                  <td>{queue.department}</td>

                  <td>
  <span
    className={
      queue.status === "Completed"
  ? "status completed"
  : queue.status === "In Progress"
  ? "status progress"
  : queue.status === "Skipped"
  ? "status skipped"
  : queue.status === "Cancelled"
  ? "status cancelled"
  : "status waiting"
    }
  >
    {queue.status}
  </span>
</td>

<td>

  {queue.status === "In Progress" && ( 
    <>
      <button
        className="complete-btn"
        onClick={() => handleComplete(queue._id)}
      >
        Complete
      </button>

      <button
        className="delete-btn"
        style={{
          marginLeft: "10px",
          background: "#f59e0b",
        }}
        onClick={async () => {
          try {
            await updateQueueStatus(
              queue._id,
              "Skipped"
            );

            toast.success("Queue Skipped ⏭️");

            fetchQueues();
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Skip
      </button>

      <button
  className="delete-btn"
  style={{
    marginLeft: "10px",
    background: "#ef4444",
  }}
  onClick={async () => {
    try {
      await updateQueueStatus(
        queue._id,
        "Cancelled"
      );

      toast.success("Queue Cancelled ❌");

      fetchQueues();
    } catch (error) {
      console.log(error);
    }
  }}
>
  Cancel
</button>
    </>
  )}

  <button
    className="delete-btn"
    onClick={() => handleDelete(queue._id)}
  >
    Delete
  </button>

</td>



                </tr>

              ))

            ) : (

              <tr>
                <td colSpan={5}>
                  No Queue Found
                </td>
              </tr>

            )}

          </tbody>

        </table>

        <div
  style={{
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
  }}
>
  <button
    className="back-btn"
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
  >
    Previous
  </button>

  <span>
    Page {page} of {totalPages}
  </span>

  <button
    className="back-btn"
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
  >
    Next
  </button>
</div>

      </div>

    </div>
  );
}

export default QueueManagement;