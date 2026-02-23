import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ClientLayout = ({ children }) => {
  const { logout, user } = useContext(AuthContext);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6">

        <h2 className="text-2xl font-bold mb-8">
          PSS Client
        </h2>

        <nav className="flex flex-col space-y-4">
          <Link
            to="/client/services"
            className="hover:text-gray-300"
          >
            Request Service
          </Link>

          <Link
            to="/client"
            className="hover:text-gray-300"
          >
            Dashboard
          </Link>

          <Link
            to="/client/notifications"
            className="hover:text-gray-300"
          >
            Notifications
          </Link>

          <button
            onClick={logout}
            className="mt-6 bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>

        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">

        <h1 className="text-xl font-semibold mb-6">
          Welcome, {user?.name}
        </h1>

        {children}

      </div>
    </div>
  );
};

export default ClientLayout;