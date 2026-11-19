import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-5">
      <h2 className="text-2xl font-bold mb-8">ELMS</h2>

      <nav className="flex flex-col gap-4">
        <Link
          to="/employee-dashboard"
          className="px-3 py-2 rounded hover:bg-slate-800"
        >
          Dashboard
        </Link>

        <Link
          to="/apply-leave"
          className="px-3 py-2 rounded hover:bg-slate-800"
        >
          Apply Leave
        </Link>

        <Link to="/my-leaves" className="px-3 py-2 rounded hover:bg-slate-800">
          My Leaves
        </Link>
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
