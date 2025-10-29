import React, { useEffect, useState } from "react";
import { getScheduledTests, startAttempt } from "../api/candidateApi";

function CandidateDashboard() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    getScheduledTests().then((res) => setTests(res.data.tests));
  }, []);

  const handleStart = async (testId) => {
    const res = await startAttempt(testId);
    alert(`Exam started! Attempt ID: ${res.data.attemptId}`);
    // navigate(`/exam/${res.data.attemptId}`);
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
