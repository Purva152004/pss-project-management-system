import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../layout/AdminLayout";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/stats`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setStats(res.data);
    };

    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Users" value={stats.users} color="bg-blue-500" />
        <Card title="Total Projects" value={stats.projects} color="bg-green-500" />
        <Card title="Pending Requests" value={stats.pendingRequests} color="bg-yellow-500" />
        <Card title="Completed Projects" value={stats.completedProjects} color="bg-purple-500" />
      </div>
    </AdminLayout>
  );
};

const Card = ({ title, value, color }) => (
  <div className={`${color} text-white p-6 rounded-lg shadow`}>
    <h3 className="text-lg">{title}</h3>
    <p className="text-3xl font-bold">{value || 0}</p>
  </div>
);

export default AdminDashboard;