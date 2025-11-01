import React, { useEffect, useState } from "react";
import { getScheduledTests, startAttempt } from "../api/candidateApi";
import { useNavigate } from "react-router-dom";

function CandidateDashboard() {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

// fetch scheduled tests on mount
  useEffect(() => {
    getScheduledTests()
      .then((res) => setTests(res.data.tests))
      .catch((err) => console.error("Error fetching tests:", err));
  }, []);

  // handle start attempt
  const handleStart = async (testId) => {
    try {
      const res = await startAttempt(testId);
      alert(`✅ Exam started! Attempt ID: ${res.data.attemptId}`);
      navigate(`/exam/${res.data.attemptId}`);
    } catch (err) {
      if (err.response) {
        // Server responded but with error
        if (err.response.status === 400) {
          alert("⚠️ You have already attempted this test.");
        } else if (err.response.status === 403) {
          alert("❌ Only candidates can start attempts.");
        } else {
          alert(`Unexpected error: ${err.response.data.error || "Unknown"}`);
        }
      } else {
        // Network or unknown error
        alert("Network error. Please try again later.");
      }
      console.error("Attempt start error:", err);
    }
    
  };

  return (
    
    <div>
      <h2>Scheduled Tests</h2>
      {tests.map((t) => (
        <div key={t.id}>
          <p>{t.title}</p>
          <p>{new Date(t.scheduledAt).toLocaleString()}</p>
          <button onClick={() => handleStart(t.id)}>Start Exam</button>
        </div>
      ))}
    </div>
  );
}

export default CandidateDashboard;
