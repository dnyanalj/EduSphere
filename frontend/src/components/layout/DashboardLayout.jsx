// src/components/layout/DashboardLayout.jsx
import React from "react";
import Navbar from "./NavBar";
import Sidebar from "./SideBar";

import CandidateCard from "@/components/CandidateCard";
import ExaminerCard from "@/components/ExaminerCard";

export default function DashboardLayout({
  role = "candidate",
  tests,
  onStartExam,
}) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar role={role} />
      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <Navbar role={role} />

        <main className="flex-1 overflow-y-auto px-6 py-6">
          <h1 className="text-2xl font-semibold mb-6">
            {role === "candidate" ? "📘 Scheduled Exams" : "🧠 Created Tests"}
          </h1>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {tests.length > 0 ? (
              tests.map((test) =>
                role === "candidate" ? (
                  <CandidateCard key={test.id} test={test} onStartExam={onStartExam} />
                ) : (
                  <ExaminerCard key={test.id} test={test} />
                )
              )
            ) : (
              <p className="text-gray-500">No data available.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
