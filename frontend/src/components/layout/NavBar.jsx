// src/components/layout/Navbar.jsx
import React from "react";
import { Bell, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar({ role = "Candidate" }) {
  const navigate = useNavigate();
  return (
    <nav className="h-16 bg-white shadow-md  border-gray-500 flex items-center justify-between px-6">

      <div className="flex items-center gap-6">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-100 px-4 py-2 rounded-lg w-72 outline-none"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">
        {/* Bell */}
        <div className="relative cursor-pointer">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-2 text-xs bg-red-500 text-white px-1 rounded-full">
            2
          </span>
        </div>

        <div className="relative cursor-pointer">
          <Mail className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-2 text-xs bg-red-500 text-white px-1 rounded-full">
            5
          </span>
        </div>

        <div className="flex items-center gap-2 cursor-pointer">
          <span className="font-medium text-gray-700"></span>
          <img
            src="/userPhoto.jpg"
            className="w-10 h-10 rounded-full object-cover"
            onClick={() => navigate(`/profile`)}
          />
        </div>
      </div>
    </nav>
  );
}
