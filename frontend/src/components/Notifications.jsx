import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const handleNotificationClick = async (notif) => {
    try {
      await axios.post(
        `http://localhost:8000/notifications/${notif._id}/read`,{},
        {withCredentials:true}
      );

      setNotifications((prev) =>
        prev.map((n) => (n._id === notif._id ? { ...n, isRead: true } : n))
      );

      navigate(notif.link);
    } catch (err) {
      console.error("Failed to mark notification as read", err);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("http://localhost:8000/notifications", {
          withCredentials: true,
        });
        setNotifications(res.data);
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className=" pl-10 pr-10 bg-[#0f0f0f] min-h-screen mx-auto text-white">
      <h1 className="  pt-10 text-2xl font-bold mb-6">Notifications</h1>

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
                    {/* Add more types if needed */}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notif.createdAt).toLocaleString()}
                  </p>
                </div>
                {!notif.isRead && (
                  <span className="text-xs text-blue-400 font-semibold mt-1">
                    New
                  </span>
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
