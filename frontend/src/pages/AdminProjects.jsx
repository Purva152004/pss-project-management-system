import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../layout/AdminLayout";

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [clients, setClients] = useState([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    clientId: "",
    employeeIds: [],
  });

  const tokenHeader = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);

      const [projectsRes, employeesRes, clientsRes] = await Promise.all([
        axios.get(
          `${import.meta.env.VITE_API_URL}/admin/projects`,
          tokenHeader
        ),
        axios.get(
          `${import.meta.env.VITE_API_URL}/admin/employees`,
          tokenHeader
        ),
        axios.get(
          `${import.meta.env.VITE_API_URL}/admin/clients`,
          tokenHeader
        ),
      ]);

      setProjects(projectsRes.data);
      setEmployees(employeesRes.data);
      setClients(clientsRes.data);
    } catch (err) {
      console.error("Fetch error:", err.response?.data || err.message);
      alert("Failed to load project data");
    } finally {
      setLoading(false);
    }
  };

  /* ================= CREATE PROJECT ================= */

  const handleCreate = async () => {
    if (!form.name.trim()) {
      alert("Project name is required");
      return;
    }

    if (!form.clientId) {
      alert("Please select a client");
      return;
    }

    try {
      setSubmitting(true);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/projects`,
        form,
        tokenHeader
      );

      alert("Project created successfully!");

      setForm({
        name: "",
        description: "",
        clientId: "",
        employeeIds: [],
      });

      fetchAllData();
    } catch (err) {
      console.error("Create error:", err.response?.data || err.message);
      alert("Project creation failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6">Project Management</h2>

      {/* ================= CREATE FORM ================= */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Create Project</h3>

        <input
          type="text"
          placeholder="Project Name"
          className="w-full border p-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        {/* Client Dropdown */}
        <select
          className="w-full border p-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.clientId}
          onChange={(e) =>
            setForm({ ...form, clientId: e.target.value })
          }
        >
          <option value="">Select Client</option>
          {clients.map((client) => (
            <option key={client._id} value={client._id}>
              {client.name}
            </option>
          ))}
        </select>

        {/* Employees Multi Select */}
        <select
          multiple
          className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={form.employeeIds}
          onChange={(e) =>
            setForm({
              ...form,
              employeeIds: Array.from(
                e.target.selectedOptions,
                (option) => option.value
              ),
            })
          }
        >
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleCreate}
          disabled={submitting}
          className={`px-4 py-2 rounded text-white ${
            submitting
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {submitting ? "Creating..." : "Create Project"}
        </button>
      </div>

      {/* ================= PROJECT TABLE ================= */}

      <div className="bg-white shadow rounded-lg p-6">
        <div className="overflow-x-auto">
        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-500">No projects found.</p>
        ) : (
          
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-3">Name</th>
                <th>Client</th>
                <th>Status</th>
                <th>Employees</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id} className="border-b hover:bg-gray-50">
                  <td className="py-3">{project.name}</td>
                  <td>{project.client?.name}</td>
                  <td>
                    <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">
                      {project.status}
                    </span>
                  </td>
                  <td>
                    {project.assignedEmployees?.length > 0
                      ? project.assignedEmployees
                          .map((emp) => emp.name)
                          .join(", ")
                      : "No employees"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProjects;