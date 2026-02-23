import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const AdminLayout = ({ children }) => {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6 space-y-6">
        <h1 className="text-2xl font-bold">PSS Admin</h1>

        <nav className="flex flex-col space-y-3">
          <Link to="/admin" className="hover:text-blue-400">Dashboard</Link>
          <Link to="/admin/users" className="hover:text-blue-400">Users</Link>
          <Link to="/admin/projects" className="hover:text-blue-400">Projects</Link>
          <Link to="/admin/services" className="hover:text-blue-400">Services</Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-10 bg-red-500 px-3 py-2 rounded w-full"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            Welcome, {user?.name}
          </h2>
        </div>

        {children}
      </div>
    </div>
  );
};

export default AdminLayout;