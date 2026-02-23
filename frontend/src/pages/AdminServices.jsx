import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../layout/AdminLayout";

const AdminServices = () => {
  const [requests, setRequests] = useState([]);

  const tokenHeader = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/services`,
      tokenHeader
    );
    setRequests(res.data);
  };

  const approve = async (id) => {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/services/${id}/approve`,
      {},
      tokenHeader
    );

    fetchRequests();
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-6">
        Service Requests
      </h2>

      <div className="bg-white p-6 shadow rounded-lg">
        {requests.map((req) => (
          <div
            key={req._id}
            className="border-b py-4 flex justify-between"
          >
            <div>
              <h4 className="font-semibold">
                {req.title}
              </h4>
              <p>{req.client?.name}</p>
              <p>Status: {req.status}</p>
            </div>

            {req.status === "Pending" && (
              <button
                onClick={() => approve(req._id)}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Approve
              </button>
            )}
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminServices;