import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ExamCard from "@/components/ExamCard";
import { useState } from "react";

export default function DashboardLayout({ tests, onStartExam }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar username="Dnyanal" />

        <main className="flex-1 overflow-y-auto p-6">
          <h1 className="text-2xl font-semibold mb-6">📘 Scheduled Exams</h1>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {tests.length > 0 ? (
              tests.map((test) => (
                <ExamCard key={test.id} test={test} onStartExam={onStartExam} />
              ))
            ) : (
              <p className="text-gray-500">No exams scheduled yet.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
