import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

function Sidebar() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/auth/me");

        setUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged Out Successfully");

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-5">
      <h2 className="text-2xl font-bold mb-4">ELMS</h2>

      <p className="text-slate-300 mb-6">
        Welcome,
        <br />
        <span className="font-semibold">{user?.name}</span>
      </p>
      <nav className="flex flex-col gap-3">
        {user?.role === "EMPLOYEE" && (
          <>
            <NavLink
              to="/employee-dashboard"
              className={({ isActive }) =>
                `px-3 py-2 rounded ${
                  isActive ? "bg-blue-600 text-white" : "hover:bg-slate-800"
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/apply-leave"
              className={({ isActive }) =>
                `px-3 py-2 rounded ${
                  isActive ? "bg-blue-600 text-white" : "hover:bg-slate-800"
                }`
              }
            >
              Apply Leave
            </NavLink>

            <NavLink
              to="/my-leaves"
              className={({ isActive }) =>
                `px-3 py-2 rounded ${
                  isActive ? "bg-blue-600 text-white" : "hover:bg-slate-800"
                }`
              }
            >
              My Leaves
            </NavLink>
          </>
        )}

        {user?.role === "MANAGER" && (
          <>
            <NavLink
              to="/manager-dashboard"
              className={({ isActive }) =>
                `px-3 py-2 rounded ${
                  isActive ? "bg-blue-600 text-white" : "hover:bg-slate-800"
                }`
              }
            >
              Dashboard
            </NavLink>
          </>
        )}

        {user?.role === "ADMIN" && (
          <>
            <NavLink
              to="/admin-dashboard"
              className={({ isActive }) =>
                `px-3 py-2 rounded ${
                  isActive ? "bg-blue-600 text-white" : "hover:bg-slate-800"
                }`
              }
            >
              Dashboard
            </NavLink>
          </>
        )}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-10 w-full bg-red-600 py-2 rounded-lg hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
