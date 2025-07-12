import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const handleNotificationClick = async (notif) => {
    try {
      await axios.post(`http://localhost:3001/notifications/${notif._id}/read`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setNotifications((prev) =>
        prev.map((n) => (n._id === notif._id ? { ...n, isRead: true } : n))
      );

      navigate(notif.link);
    } catch (err) {
      console.error("Failed to mark notification as read", err);
    }
  };

  useEffect(() => {
    // Replace with actual API call
    const sample = [
      {
        _id: "6871f304f326423f5b06627e",
        user: "6871f20ff326423f5b066261",
        type: "reply",
        link: "/questions/6871f217f326423f5b066264",
        isRead: false,
        createdAt: "2025-07-12T05:30:44.318Z",
      },
      {
        _id: "6871f304f326423f5b06627e",
        user: "6871f20ff326423f5b066261",
        type: "reply",
        link: "/questions/6871f217f326423f5b066264",
        isRead: false,
        createdAt: "2025-07-12T05:30:44.318Z",
      },
      {
        _id: "6871f304f326423f5b06627e",
        user: "6871f20ff326423f5b066261",
        type: "reply",
        link: "/questions/6871f217f326423f5b066264",
        isRead: false,
        createdAt: "2025-07-12T05:30:44.318Z",
      },
    ];
    setNotifications(sample);
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 text-white">
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>

      {notifications.length === 0 ? (
        <p className="text-gray-400">You're all caught up 🎉</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notif) => (
            <li
              key={notif._id}
              onClick={() => handleNotificationClick(notif)}
              className={`p-4 rounded-lg cursor-pointer border transition-all duration-200 
                ${notif.isRead
                  ? "bg-[#1a1a1a] border-gray-700 hover:border-gray-600"
                  : "bg-[#242424] border-blue-500 hover:border-blue-400"
                }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium">
                    {notif.type === "reply" && (
                      <span>💬 Someone replied to your question</span>
                    )}
                    {notif.type === "vote" && (
                      <span>⬆️ Your reply got a new vote</span>
                    )}
                    {/* Add more types here */}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notif.createdAt).toLocaleString()}
                  </p>
                </div>
                {!notif.isRead && (
                  <span className="text-xs text-blue-400 font-semibold mt-1">New</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationPage;
