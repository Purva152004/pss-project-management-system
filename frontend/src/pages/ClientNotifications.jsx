import { useEffect, useState } from "react";
import axios from "axios";
import ClientLayout from "../layout/ClientLayout";

const ClientNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const tokenHeader = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/notifications`,
      tokenHeader
    );
    setNotifications(res.data);
  };

  const markAsRead = async (id) => {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/notifications/${id}`,
      {},
      tokenHeader
    );
    fetchNotifications();
  };

  return (
    <ClientLayout>
      <h2 className="text-2xl font-bold mb-6">
        Notifications
      </h2>

      <div className="bg-white p-6 shadow rounded-lg">
        {notifications.length === 0 ? (
          <p>No notifications</p>
        ) : (
          notifications.map((note) => (
            <div
              key={note._id}
              className={`border-b py-3 flex justify-between ${
                note.read ? "opacity-60" : ""
              }`}
            >
              <p>{note.message}</p>

              {!note.read && (
                <button
                  onClick={() => markAsRead(note._id)}
                  className="text-blue-600 text-sm"
                >
                  Mark as read
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </ClientLayout>
  );
};

export default ClientNotifications;