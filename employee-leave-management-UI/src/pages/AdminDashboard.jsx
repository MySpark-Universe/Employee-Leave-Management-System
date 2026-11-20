import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const statsResponse = await api.get("/dashboard/stats");

      const employeeResponse = await api.get("/employees");
      const response = await api.get("/auth/me");
      setUser(response.data);
      setStats(statsResponse.data);
      setEmployees(employeeResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deactivateEmployee = async (id) => {
    try {
      await api.put(`/employees/${id}/deactivate`);

      toast.success("Employee Deactivated");

      fetchData();
    } catch (error) {
      console.error(error);

      toast.error("Failed to Deactivate Employee");
    }
  };

  if (!stats) {
    return <Loader />;
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold">Welcome Back, {user?.name} 👋</h1>

      <p className="text-gray-500">Administration Dashboard</p>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl shadow">
          <p>Total Leaves</p>
          <h2 className="text-3xl font-bold">{stats.totalLeaves}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p>Pending</p>
          <h2 className="text-3xl font-bold text-yellow-600">
            {stats.pendingLeaves}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p>Approved</p>
          <h2 className="text-3xl font-bold text-green-600">
            {stats.approvedLeaves}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p>Rejected</p>
          <h2 className="text-3xl font-bold text-red-600">
            {stats.rejectedLeaves}
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Employees</h2>

        <table className="w-full">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-3">Name</th>

              <th>Email</th>

              <th>Role</th>

              <th>Department</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="border-b text-center">
                <td className="p-3">{employee.name}</td>

                <td>{employee.email}</td>

                <td>{employee.role}</td>

                <td>{employee.department}</td>

                <td>
                  <button
                    onClick={() => {
                      const confirmed = window.confirm(
                        `Deactivate ${employee.name}?`,
                      );

                      if (confirmed) {
                        deactivateEmployee(employee.id);
                      }
                    }}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Deactivate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default AdminDashboard;
