import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [unreadCount, setUnreadCount] = useState(0);
    const navigate = useNavigate();

  const handleNotificationClick = () => {
    navigate('/notifications');
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:8000/notifications", {
          withCredentials: true,
        });
        const data = response.data;
        const unread = data.filter((notif) => notif.isRead === false).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();

    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-2 bg-white shadow-sm border-b sticky top-0 z-50 w-full">
      {/* Left: Logo */}
      <div className="text-[#B92B27] font-extrabold text-2xl tracking-tight">
        Quora
      </div>

      {/* Middle: Search bar */}
      <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-3 py-1 w-[300px] border border-gray-300">
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M16 10.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search Quora"
          className="bg-transparent focus:outline-none ml-2 text-sm text-gray-700 placeholder-gray-500 w-full"
        />
      </div>

      {/* Right: Icons */}
      <div className="flex items-center gap-3">
        {/* Sign In Button */}
        <a
          href="/signin"
          className="text-sm font-medium text-blue-600 hover:underline transition"
        >
          Sign In
        </a>

        {/* Notification Icon */}
        <button onClick={handleNotificationClick} className="relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
          <svg
            className="w-5 h-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C8.67 6.165 8 7.388 8 9v5.159c0 .538-.214 1.055-.595 1.436L6 17h5m4 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Menu Icon */}
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition">
          <svg
            className="w-5 h-5 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 bg-gray-400 rounded-full flex items-center justify-center font-bold text-white text-sm">
          R
        </div>
      </div>
    </header>
  );
}
