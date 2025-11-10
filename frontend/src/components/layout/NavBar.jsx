import React from "react";
import { Bell, Settings } from "lucide-react";

export default function Navbar({ username }) {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">
      <div className="text-xl font-bold text-gray-800">Quizlytic</div>
      <div className="flex items-center gap-4">
        <Bell className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
        <Settings className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
        <span className="text-sm text-gray-700 font-medium">
          {username || "Candidate"}
        </span>
      </div>
    </nav>
  );
}
