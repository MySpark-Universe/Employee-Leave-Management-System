import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";

function MyLeaves() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      const response = await api.get("/leaves/mine");

      setLeaves(response.data);
    };

    fetchLeaves();
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">My Leaves</h1>

      <table className="w-full bg-white shadow rounded-xl">
        <thead>
          <tr className="bg-slate-200">
            <th className="p-3">Leave Type</th>

            <th>Status</th>

            <th>Start Date</th>

            <th>End Date</th>

            <th>Manager Comment</th>
          </tr>
        </thead>

        <tbody>
          {leaves.map((leave) => (
            <tr key={leave.id} className="text-center border-b">
              <td className="p-3">{leave.leaveType}</td>

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

              <td>{leave.startDate}</td>

              <td>{leave.endDate}</td>

              <td>{leave.managerComment || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default MyLeaves;
