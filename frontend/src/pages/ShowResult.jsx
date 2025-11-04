import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getResult } from "../api/candidateApi";

function ShowResult() {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function fetchResult() {
      try {
        const res = await getResult(attemptId);
        setResult(res.data);
      } catch (err) {
        console.error("Error fetching result:", err);
      }
    }
    // actual call to function
    fetchResult();
  }, [attemptId]);

  if (!result) return <p>Loading result...</p>;

  return (
    <div>
      <h2>Result</h2>
      <p>
        Score: {result.score} / {result.total}
      </p>

      {result.details.map((q, i) => (
        <div key={i} style={{ marginBottom: "1rem" }}>
          <p><strong>Q{i + 1}:</strong> {q.question}</p>
          <p>✔️ Correct Answer: {q.correctOption}</p>
          <p>🧠 Your Answer: {q.userOption || "Not answered"}</p>
          <p style={{ color: q.isCorrect ? "green" : "red" }}>
            {q.isCorrect ? "Correct" : "Incorrect"}
          </p>
        </div>
      ))}


      <button onClick={() =>navigate("/candidate/dashboard")}>back</button>
    </div>
  );
}

export default ShowResult;
