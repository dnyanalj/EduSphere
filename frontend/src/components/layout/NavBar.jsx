// src/components/layout/Navbar.jsx
import React from "react";
import { Bell, Mail } from "lucide-react";

export default function Navbar({ username = "Candidate" }) {
  return (
    <nav className="h-16 bg-white shadow-md  border-gray-500 flex items-center justify-between px-6">
      {/* LEFT SIDE: Logo + Search */}
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

        {/* Email */}
        <div className="relative cursor-pointer">
          <Mail className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-2 text-xs bg-red-500 text-white px-1 rounded-full">
            5
          </span>
        </div>

        {/* Username + Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="font-medium text-gray-700">{username}</span>
          <img
            src="/avatar.png"   // <-- replace with real user profile
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
}
