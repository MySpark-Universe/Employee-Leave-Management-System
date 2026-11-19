import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 bg-slate-100 min-h-screen">{children}</div>
    </div>
  );
}

export default Layout;
