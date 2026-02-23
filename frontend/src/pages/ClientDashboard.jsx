import { useEffect, useState } from "react";
import axios from "axios";
import ClientLayout from "../layout/ClientLayout";

const ClientDashboard = () => {
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
        `${import.meta.env.VITE_API_URL}/client/projects`,
        tokenHeader
      );
      setProjects(res.data);
    } catch (err) {
      alert("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClientLayout>
      <h2 className="text-2xl font-bold mb-6">
        My Projects
      </h2>

      <div className="bg-white shadow rounded-lg p-6">
        {loading ? (
          <p>Loading...</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-500">
            No projects available.
          </p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-3">Project</th>
                <th>Status</th>
                <th>Assigned Employees</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-3">
                    {project.name}
                  </td>
                  <td>
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                      {project.status}
                    </span>
                  </td>
                  <td>
                    {project.assignedEmployees
                      .map((emp) => emp.name)
                      .join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </ClientLayout>
  );
};

export default ClientDashboard;