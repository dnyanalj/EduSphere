import React from "react";
import { Home, BookOpen, BarChart2, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Added useNavigate import
import { logout } from "@/api/authApi";

export default function Sidebar() {
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", icon: Home, path: "/candidate/dashboard" },
    { name: "Practice", icon: BookOpen, path: "/candidate/practice" },
    { name: "Analytics", icon: BarChart2, path: "/candidate/analytics" },
    { name: "Profile", icon: User, path: "/candidate/profile" },
  ];

  // ✅ Make the function async (since you're using await)
  const handleLogout = async () => {
    try {
      await logout(); // Calls backend logout API
      localStorage.removeItem("token"); // or sessionStorage if you store JWT
      alert("Logged out successfully!");
      navigate("/login"); // Redirect user to login page
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Failed to logout. Try again.");
    }
  };

  return (
    <aside className="w-60 bg-white border-r shadow-sm p-5 flex flex-col">
      <div className="text-lg font-semibold mb-6">📚 Menu</div>
      <nav className="flex-1 space-y-2">
        {menu.map(({ name, icon: Icon, path }) => (
          <Link
            key={name}
            to={path}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            <Icon className="w-4 h-4" />
            {name}
          </Link>
        ))}
      </nav>

      {/* ✅ Correct onClick usage — call the function, don’t just reference it */}
      <button
        className="flex items-center gap-2 text-red-500 hover:text-red-700 mt-auto"
        onClick={handleLogout}
      >
        <LogOut className="w-4 h-4" /> Logout
      </button>
    </aside>
  );
}
