import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-blue-600">404</h1>

        <p className="text-gray-500 text-xl mt-4">Page Not Found</p>

        <Link
          to="/"
          className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
