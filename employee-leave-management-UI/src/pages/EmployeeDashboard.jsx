import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

function EmployeeDashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/dashboard/employee");

        setDashboard(response.data);
      } catch (error) {
        console.error(error);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
        }
      }
    };

    fetchDashboard();
  }, []);

  if (!dashboard) {
    return <h2>Loading...</h2>;
  }

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome Back 👋</h1>

        <p className="text-gray-500">Employee Leave Management Dashboard</p>
      </div>

      <div className="grid md:grid-cols-4 gap-5">
        <div className="bg-white rounded-xl shadow p-5 hover:shadow-xl hover:-translate-y-1 transition duration-300">
          <h3>Total Leaves</h3>
          <p className="text-3xl font-bold">{dashboard.totalLeaves}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5 hover:shadow-xl hover:-translate-y-1 transition duration-300">
          <h3>Approved</h3>
          <p className="text-3xl font-bold text-green-600">
            {dashboard.approvedLeaves}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5 hover:shadow-xl hover:-translate-y-1 transition duration-300">
          <h3>Pending</h3>
          <p className="text-3xl font-bold text-orange-500">
            {dashboard.pendingLeaves}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-5 hover:shadow-xl hover:-translate-y-1 transition duration-300">
          <h3>Rejected</h3>
          <p className="text-3xl font-bold text-red-600">
            {dashboard.rejectedLeaves}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mt-6">
        <div className="bg-white rounded-xl shadow p-5 hover:shadow-xl hover:-translate-y-1 transition duration-300">
          <h3>Casual Leave</h3>
          <p className="text-3xl font-bold">{dashboard.casualLeave}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5 hover:shadow-xl hover:-translate-y-1 transition duration-300">
          <h3>Sick Leave</h3>
          <p className="text-3xl font-bold">{dashboard.sickLeave}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-5 hover:shadow-xl hover:-translate-y-1 transition duration-300">
          <h3>Earned Leave</h3>
          <p className="text-3xl font-bold">{dashboard.earnedLeave}</p>
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        <button className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700">
          Apply Leave
        </button>

        <button className="bg-slate-800 text-white px-5 py-3 rounded-lg hover:bg-slate-900">
          View My Leaves
        </button>
      </div>
    </Layout>
  );
}

export default EmployeeDashboard;
