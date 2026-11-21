import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../services/api";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");

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
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search Employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 border rounded-lg p-3"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border rounded-lg p-3"
        >
          <option value="ALL">All Roles</option>

          <option value="EMPLOYEE">Employee</option>

          <option value="MANAGER">Manager</option>

          <option value="ADMIN">Admin</option>
        </select>
      </div>
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Employees</h2>

        <table className="w-full">
          <thead>
            <tr className="bg-slate-100">
              <th className="p-3">Name</th>

              <th>Email</th>

              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees
              .filter((employee) => {
                const matchesSearch = employee.name
                  .toLowerCase()
                  .includes(search.toLowerCase());

                const matchesRole =
                  roleFilter === "ALL" ? true : employee.role === roleFilter;

                return matchesSearch && matchesRole;
              })
              .map((employee) => (
                <tr key={employee.id} className="border-b text-center">
                  <td className="p-3">{employee.name}</td>

                  <td>{employee.email}</td>

                  <td>
                    <span
                      className={
                        employee.role === "ADMIN"
                          ? "bg-purple-100 text-purple-700 px-3 py-1 rounded-full"
                          : employee.role === "MANAGER"
                            ? "bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                            : "bg-green-100 text-green-700 px-3 py-1 rounded-full"
                      }
                    >
                      {employee.role}
                    </span>
                  </td>

                  <td>
                    {employee.active ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        Active
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full">
                        Deactivated
                      </span>
                    )}
                  </td>

                  <td>
                    <button
                      disabled={!employee.active}
                      onClick={() => {
                        const confirmed = window.confirm(
                          `Deactivate ${employee.name}?`,
                        );

                        if (confirmed) {
                          deactivateEmployee(employee.id);
                        }
                      }}
                      className={`px-3 py-1 rounded text-white ${
                        employee.active
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {employee.active ? "Deactivate" : "Already Deactivated"}
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
