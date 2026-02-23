import { useEffect, useState } from "react";
import axios from "axios";
import ClientLayout from "../layout/ClientLayout";

const ClientServices = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

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
      `${import.meta.env.VITE_API_URL}/services/my`,
      tokenHeader
    );
    setRequests(res.data);
  };

  const handleSubmit = async () => {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/services`,
      form,
      tokenHeader
    );

    setForm({ title: "", description: "" });
    fetchRequests();
  };

  return (
    <ClientLayout>
      <h2 className="text-2xl font-bold mb-6">
        Request Service
      </h2>

      {/* Submit Form */}
      <div className="bg-white p-6 shadow rounded-lg mb-8">
        <input
          type="text"
          placeholder="Service Title"
          className="w-full border p-2 mb-3 rounded"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2 mb-3 rounded"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Request
        </button>
      </div>

      {/* My Requests Status */}
      <div className="bg-white p-6 shadow rounded-lg">
        <div className="overflow-x-auto">
        <h3 className="text-lg font-semibold mb-4">
          My Requests
        </h3>

        {requests.length === 0 ? (
          <p className="text-gray-500">
            No requests submitted yet.
          </p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Title</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id} className="border-b">
                  <td className="py-2">{req.title}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        req.status === "Approved"
                          ? "bg-green-100 text-green-600"
                          : req.status === "Rejected"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        </div>
      </div>
    </ClientLayout>
  );
};

export default ClientServices;