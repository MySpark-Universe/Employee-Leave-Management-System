import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

function ManagerDashboard() {
  const [leaves, setLeaves] = useState([]);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchLeaves();
    fetchStats();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await api.get("/leaves/manager");
      const respon = await api.get("/auth/me");
      setUser(respon.data);
      setLeaves(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const fetchStats = async () => {
    try {
      const response = await api.get("/dashboard/manager");

      console.log("MANAGER STATS =", response.data);

      setStats(response.data);
    } catch (error) {
      console.log(error);

      if (error.response) {
        console.log("STATUS =", error.response.status);
        console.log("DATA =", error.response.data);
      }
    }
  };

  const approveLeave = async (id) => {
    try {
      await api.put(`/leaves/${id}/approve`, {
        comment: comments[id] || "Approved",
      });
      toast.success("Leave Approved");
      setComments((prev) => ({
        ...prev,
        [id]: "",
      }));

      fetchLeaves();
      fetchStats();
    } catch (error) {
      console.error(error);
    }
  };

  const rejectLeave = async (id) => {
    try {
      await api.put(`/leaves/${id}/reject`, {
        comment: comments[id] || "Rejected",
      });
      toast.success("Leave Rejected");
      setComments((prev) => ({
        ...prev,
        [id]: "",
      }));

      fetchLeaves();
      fetchStats();
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }
  return (
    <Layout>
      <h1 className="text-3xl font-bold">Welcome Back, {user?.name} 👋</h1>

      <p className="text-gray-500">Manager Leave Approval Dashboard</p>
      {stats && (
        <div className="grid md:grid-cols-3 gap-5 mb-6">
          <div className="bg-white rounded-xl shadow p-5 hover:shadow-xl transition">
            <p className="text-gray-500">Pending Requests</p>

            <h2 className="text-4xl font-bold text-yellow-600">
              {stats.pendingRequests}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-5 hover:shadow-xl transition">
            <p className="text-gray-500">Approved Requests</p>

            <h2 className="text-4xl font-bold text-green-600">
              {stats.approvedRequests}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-5 hover:shadow-xl transition">
            <p className="text-gray-500">Rejected Requests</p>

            <h2 className="text-4xl font-bold text-red-600">
              {stats.rejectedRequests}
            </h2>
          </div>
        </div>
      )}
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
                    disabled={leave.status !== "PENDING"}
                    placeholder="Enter Comment"
                    value={comments[leave.id] || ""}
                    onChange={(e) =>
                      setComments({
                        ...comments,
                        [leave.id]: e.target.value,
                      })
                    }
                    className={`border rounded p-2 w-full mb-2 ${
                      leave.status !== "PENDING"
                        ? "bg-gray-100 cursor-not-allowed"
                        : ""
                    }`}
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
                        onClick={() => {
                          const confirmed = window.confirm(
                            "Are you sure you want to approve this leave?",
                          );

                          if (confirmed) {
                            approveLeave(leave.id);
                          }
                        }}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => {
                          const confirmed = window.confirm(
                            "Are you sure you want to reject this leave?",
                          );

                          if (confirmed) {
                            rejectLeave(leave.id);
                          }
                        }}
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
