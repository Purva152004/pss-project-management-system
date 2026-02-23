import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { logout } = useContext(AuthContext);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div
        className={`fixed md:static z-50 bg-slate-900 text-white w-64 p-6 transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h1 className="text-2xl font-bold mb-8">PSS Admin</h1>

        <nav className="flex flex-col space-y-4">
          <Link to="/admin" onClick={() => setOpen(false)}>Dashboard</Link>
          <Link to="/admin/users" onClick={() => setOpen(false)}>Users</Link>
          <Link to="/admin/projects" onClick={() => setOpen(false)}>Projects</Link>
          <Link to="/admin/services" onClick={() => setOpen(false)}>Services</Link>
        </nav>

        <button
          onClick={logout}
          className="mt-8 bg-red-500 px-4 py-2 rounded w-full"
        >
          Logout
        </button>
      </div>

      {/* Overlay */}
      {open && (
  <div
    className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-30"
    onClick={() => setOpen(false)}
  />
)}

      {/* Content */}
      <div className="flex-1 p-4 md:p-6">

        {/* Mobile Menu Button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setOpen(true)}
            className="text-2xl"
          >
            ☰
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default AdminLayout;