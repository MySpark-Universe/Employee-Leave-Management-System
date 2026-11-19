import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

function ManagerDashboard() {
  const [leaves, setLeaves] = useState([]);
  const [comments, setComments] = useState({});

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await api.get("/leaves/manager");

      setLeaves(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const approveLeave = async (id) => {
    try {
      await api.put(`/leaves/${id}/approve`, {
        comment: comments[id] || "Approved",
      });

      fetchLeaves();
    } catch (error) {
      console.error(error);
    }
  };

  const rejectLeave = async (id) => {
    try {
      await api.put(`/leaves/${id}/reject`, {
        comment: comments[id] || "Rejected",
      });

      fetchLeaves();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Manager Dashboard</h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4">Employee</th>
              <th>Comment</th>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.id} className="border-b text-center">
                <td className="p-4">{leave.employeeName}</td>
                <td>
                  <textarea
                    placeholder="Enter Comment"
                    value={comments[leave.id] || ""}
                    onChange={(e) =>
                      setComments({
                        ...comments,
                        [leave.id]: e.target.value,
                      })
                    }
                    className="border rounded p-2 w-full mb-2"
                  />
                </td>
                <td>{leave.leaveType}</td>

                <td>{leave.startDate}</td>

                <td>{leave.endDate}</td>

                <td>
                  <span
                    className={
                      leave.status === "APPROVED"
                        ? "bg-green-100 text-green-700 px-3 py-1 rounded-full"
                        : leave.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full"
                          : "bg-red-100 text-red-700 px-3 py-1 rounded-full"
                    }
                  >
                    {leave.status}
                  </span>
                </td>

                <td>
                  {leave.status === "PENDING" && (
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => approveLeave(leave.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => rejectLeave(leave.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default ManagerDashboard;
