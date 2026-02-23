import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../layout/AdminLayout";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
  });

  const tokenHeader = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  /* ================= FETCH USERS ================= */

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/users`,
        tokenHeader
      );
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  /* ================= CREATE USER ================= */

  const handleCreate = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    try {
      setSubmitting(true);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        form
      );

      alert("User created successfully!");

      setForm({
        name: "",
        email: "",
        password: "",
        role: "employee",
      });

      fetchUsers();
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("User creation failed");
    } finally {
      setSubmitting(false);
    }
  };

  /* ================= DELETE USER ================= */

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?"))
      return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/users/${id}`,
        tokenHeader
      );

      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6">User Management</h2>

      {/* ================= CREATE USER FORM ================= */}

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Create User</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <select
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="employee">Employee</option>
            <option value="client">Client</option>
          </select>
        </div>

        <button
          onClick={handleCreate}
          disabled={submitting}
          className={`mt-4 px-4 py-2 rounded text-white ${
            submitting
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {submitting ? "Creating..." : "Create User"}
        </button>
      </div>

      {/* ================= USERS LIST ================= */}

<div className="bg-white shadow rounded-lg p-6">

  {loading ? (
    <p>Loading users...</p>
  ) : (
    <>
      {/* ===== Desktop Table ===== */}
      <div className="hidden md:block">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-3">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-50"
              >
                <td className="py-3">{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className="capitalize bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {user.role}
                  </span>
                </td>
                <td className="text-right">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Mobile Card Layout ===== */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="border rounded-lg p-4 shadow-sm"
          >
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-600 break-all">
              {user.email}
            </p>

            <div className="mt-2 flex justify-between items-center">
              <span className="capitalize bg-gray-100 px-3 py-1 rounded-full text-sm">
                {user.role}
              </span>

              {user.role !== "admin" && (
                <button
                  onClick={() => handleDelete(user._id)}
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )}
</div>
    </AdminLayout>
  );
};

export default AdminUsers;