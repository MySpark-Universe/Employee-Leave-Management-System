import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import {
  FaHome,
  FaFileAlt,
  FaClipboardList,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

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
    }, 100);
  };
  if (!user) {
    return (
      <div
        className="
    group
    w-20
    hover:w-64
    transition-all
    duration-300
    bg-slate-900
    text-white
    min-h-screen
    overflow-hidden
    "
      >
        <div className="text-white">Loading...</div>
      </div>
    );
  }
  return (
    <div
      className="
  group
  w-20
  hover:w-64
  transition-all
  duration-300
  bg-slate-900
  text-white
  min-h-screen
  overflow-hidden
  p-4
"
    >
      <h2
        className="
  text-xl
  font-bold
  
"
      >
        ELMS
      </h2>

      <div
        className="
  opacity-0
  group-hover:opacity-100
  transition
  mb-6
  whitespace-nowrap
"
      >
        <span className="font-semibold">{user?.name}</span>
      </div>
      <nav className="flex flex-col gap-3">
        {user?.role === "EMPLOYEE" && (
          <>
            <NavLink
              to="/employee-dashboard"
              className={({ isActive }) =>
                `flex items-center gap-4 px-3 py-3 rounded ${
                  isActive ? "bg-blue-600" : "hover:bg-slate-800"
                }`
              }
            >
              <FaHome size={20} className="min-w-5" />

              <span
                className="
    ml-4
    opacity-0
    w-0
    overflow-hidden
    group-hover:w-auto
    group-hover:opacity-100
    transition-all
    duration-300
    whitespace-nowrap
    "
              >
                Dashboard
              </span>
            </NavLink>

            <NavLink
              to="/apply-leave"
              className={({ isActive }) =>
                `flex items-center gap-4 px-3 py-3 rounded ${
                  isActive ? "bg-blue-600" : "hover:bg-slate-800"
                }`
              }
            >
              <FaFileAlt size={20} className="min-w-5" />

              <span
                className="
    ml-4
    opacity-0
    w-0
    overflow-hidden
    group-hover:w-auto
    group-hover:opacity-100
    transition-all
    duration-300
    whitespace-nowrap
    "
              >
                Apply Leave
              </span>
            </NavLink>

            <NavLink
              to="/my-leaves"
              className={({ isActive }) =>
                `flex items-center gap-4 px-3 py-3 rounded ${
                  isActive ? "bg-blue-600" : "hover:bg-slate-800"
                }`
              }
            >
              <FaClipboardList size={20} className="min-w-5" />

              <span
                className="
    ml-4
    opacity-0
    w-0
    overflow-hidden
    group-hover:w-auto
    group-hover:opacity-100
    transition-all
    duration-300
    whitespace-nowrap
    "
              >
                My Leaves
              </span>
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
              {" "}
              <FaHome size={20} className="min-w-5" />
              <span
                className="
    ml-4
    opacity-0
    w-0
    overflow-hidden
    group-hover:w-auto
    group-hover:opacity-100
    transition-all
    duration-300
    whitespace-nowrap
    "
              >
                Dashboard
              </span>
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
              {" "}
              <FaHome size={20} className="min-w-5" />
              <span
                className="
    ml-4
    opacity-0
    w-0
    overflow-hidden
    group-hover:w-auto
    group-hover:opacity-100
    transition-all
    duration-300
    whitespace-nowrap
    "
              >
                Dashboard
              </span>
            </NavLink>
          </>
        )}
      </nav>

      <button
        onClick={handleLogout}
        className="
    mt-10
    w-full
    bg-red-600
    py-3
    rounded-lg
    hover:bg-red-700
    flex
    items-center
    px-3
  "
      >
        <FaSignOutAlt size={20} className="min-w-5" />

        <span
          className="
      ml-4
      opacity-0
      w-0
      overflow-hidden
      group-hover:w-auto
      group-hover:opacity-100
      transition-all
      duration-300
      whitespace-nowrap
    "
        >
          Logout
        </span>
      </button>
    </div>
  );
}

export default Sidebar;
