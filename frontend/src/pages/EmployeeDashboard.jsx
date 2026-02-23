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
    <tr key={project._id} className="border-b hover:bg-gray-50">
      <td className="py-3">{project.name}</td>
      <td>{project.client?.name}</td>

      <td>
        <select
          value={project.status}
          onChange={async (e) => {
            try {
              await axios.patch(
                `${import.meta.env.VITE_API_URL}/employee/projects/${project._id}`,
                { status: e.target.value },
                tokenHeader
              );
              fetchProjects();
            } catch (err) {
              alert("Status update failed");
            }
          }}
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
        )}
      </div>
    </EmployeeLayout>
  );
};

export default EmployeeDashboard;