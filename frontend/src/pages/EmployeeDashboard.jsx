import { useEffect, useState } from "react";
import axios from "axios";
import EmployeeLayout from "../layout/EmployeeLayout";

const EmployeeDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const tokenHeader = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/employee/projects`,
        tokenHeader
      );
      setProjects(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  // ✅ ADD THIS FUNCTION (THIS WAS MISSING)
  const updateStatus = async (projectId, status) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/employee/projects/${projectId}`,
        { status },
        tokenHeader
      );

      fetchProjects();
    } catch (err) {
      console.error(err);
      alert("Status update failed");
    }
  };

  return (
    <EmployeeLayout>
      <h2 className="text-2xl font-bold mb-6">
        My Assigned Projects
      </h2>

      <div className="bg-white shadow rounded-lg p-6">
        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-500">
            No projects assigned yet.
          </p>
        ) : (
          <>
            {/* DESKTOP TABLE */}
            <div className="hidden md:block">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="py-3">Name</th>
                    <th>Client</th>
                    <th>Status</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr
                      key={project._id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="py-3">{project.name}</td>
                      <td>{project.client?.name}</td>

                      <td>
                        <select
                          value={project.status}
                          onChange={(e) =>
                            updateStatus(project._id, e.target.value)
                          }
                          className="border rounded p-1"
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>

                      <td>{project.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="md:hidden space-y-4">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="border rounded-lg p-4 shadow-sm"
                >
                  <p className="font-semibold text-lg">
                    {project.name}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Client:</strong>{" "}
                    {project.client?.name}
                  </p>

                  <div className="mt-2">
                    <p className="text-sm font-medium">
                      Status:
                    </p>

                    <select
                      value={project.status}
                      onChange={(e) =>
                        updateStatus(project._id, e.target.value)
                      }
                      className="border rounded p-1 mt-1 w-full"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  <p className="text-sm text-gray-700 mt-2">
                    <strong>Description:</strong>{" "}
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </EmployeeLayout>
  );
};

export default EmployeeDashboard;