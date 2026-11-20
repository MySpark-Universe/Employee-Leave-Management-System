import { useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function ApplyLeave() {
  const [leaveType, setLeaveType] = useState("CASUAL");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/leaves/apply", {
        leaveType,
        startDate,
        endDate,
        reason,
      });
      toast.success("Leave Applied Successfully ✅");
      navigate("/my-leaves");

      setLeaveType("CASUAL");
      setStartDate("");
      setEndDate("");
      setReason("");
    } catch (error) {
      console.error(error);

      toast.error("Failed to Apply Leave");
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Apply Leave</h1>

      <div className="bg-white p-6 rounded-xl shadow max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option value="CASUAL">Casual Leave</option>

            <option value="SICK">Sick Leave</option>

            <option value="EARNED">Earned Leave</option>
          </select>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <textarea
            rows="4"
            placeholder="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Apply Leave
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default ApplyLeave;
