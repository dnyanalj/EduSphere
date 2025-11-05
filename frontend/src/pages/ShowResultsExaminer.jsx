import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTestResults } from "../api/examinerApi";

function showResultsExaminer() {
  const { testId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchResults() {
      try {
        const res = await getTestResults(testId);
        setData(res.data);
      } catch (err) {
        console.error("Error fetching results:", err);
      }
    }
    fetchResults();
  }, [testId]);

  if (!data) return <p>Loading results...</p>;

  return (
    <div>
      <h2>{data.testTitle} - Results</h2>
      <table border="1" cellPadding="10" style={{ marginTop: "1rem" }}>
        <thead>
          <tr>
            <th>Candidate ID</th>
            <th>Name</th>
            <th>Score</th>
            <th>Status</th>
          </tr>
          
        </thead>
        <tbody>
          {data.results.map((r, i) => (
            <tr key={i}>
              <td>{r.candidateId}</td>
              <td>{r.candidateName}</td>
              <td>
                {r.score} / {r.totalQuestions}
              </td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default showResultsExaminer;
