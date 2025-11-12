// src/pages/ExaminerDashboard.jsx
import React, { useEffect, useState } from "react";
import { getAllTests } from "../api/examinerApi";
import DashboardLayout from "@/components/layout/DashboardLayout";

function ExaminerDashboard() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllTests();
        setTests(res.data.tests || []);
      } catch (err) {
        console.error("Error fetching tests:", err);
      }
    })();
  }, []);

  return <DashboardLayout role="examiner" tests={tests} />;
}

export default ExaminerDashboard;
