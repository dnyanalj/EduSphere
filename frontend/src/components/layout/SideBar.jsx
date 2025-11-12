import React from "react";
import {
  Home,
  BookOpen,
  BarChart2,
  User,
  PlusCircle,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logout } from "@/api/authApi";

export default function Sidebar({ role = "candidate" }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Define menu items based on role
  const baseMenu = [
    { name: "Dashboard", icon: LayoutDashboard, path: `/${role}/dashboard` },
    { name: "Analytics", icon: BarChart2, path: `/${role}/analytics` },
    { name: "Profile", icon: User, path: `/${role}/profile` },
  ];

  const candidateMenu = [
    { name: "Practice", icon: BookOpen, path: "/candidate/practice" },
  ];

  const examinerMenu = [
    { name: "Create Test", icon: PlusCircle, path: "/create-test" },
  ];

  // Merge menus dynamically
  const menu =
    role === "candidate"
      ? [...baseMenu.slice(0, 1), ...candidateMenu, ...baseMenu.slice(1)]
      : [...baseMenu.slice(0, 1), ...examinerMenu, ...baseMenu.slice(1)];

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Failed to logout. Try again.");
    }
  };

  return (
    <aside
      className={`translate-x-0 md:translate-x-0 fixed md:static inset-y-0 left-0 w-64 bg-white border-r shadow-sm transform transition-transform duration-200 z-50`}
    >
      <div className="p-4 border-b flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">ShikenX</h1>
        
      </div>

      <nav className="flex flex-col p-4 space-y-2 text-gray-700">
        {menu.map(({ name, icon: Icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={name}
              to={path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              <Icon className="w-5 h-5" />
              {name}
            </Link>
          );
        })}
      </nav>

     <div className="p-4 ">
  <button
      className="absolute bottom-4 left-4 flex items-center gap-3 px-3 py-2 text-red-600 rounded-lg hover:bg-red-50 transition"
      onClick={handleLogout}
    >
      <LogOut className="w-5 h-5" />
      Logout
    </button>
    </div>
    </aside>
  );
}
