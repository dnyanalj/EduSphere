import React from 'react'
import Navbar from "./NavBar";
import Sidebar from "./SideBar";

import GraphCandidate from "../GraphCandidate";


const ExaminerAnalyticsLayout = () => {
      const analytics = {
    score: 72,
    accuracy: 68,
    totalQuestions: 40,
    correct: 27,
    wrong: 10,
    skipped: 3,
    topicWise: [
      { topic: "Arrays", accuracy: 70 },
      { topic: "DP", accuracy: 50 },
      { topic: "Graphs", accuracy: 80 },
    ],
  };

  const pieData = [
    { name: "Correct", value: analytics.correct },
    { name: "Wrong", value: analytics.wrong },
    { name: "Skipped", value: analytics.skipped },
  ];
  return (
    <div className="w-full h-screen overflow-hidden bg-gray-50">
      <div className="flex w-full h-full">
        {/* Sidebar */}
        <Sidebar role="examiner" />

        {/* Main Section */}
        <div className="flex flex-col flex-1">
          {/* Navbar */}
          <Navbar role="examiner" />

          <div className="flex-1 overflow-y-auto px-6 py-6">
            <GraphCandidate analytics={analytics} pieData={pieData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExaminerAnalyticsLayout
