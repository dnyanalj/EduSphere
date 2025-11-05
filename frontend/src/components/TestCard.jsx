import React from "react";
import { useNavigate } from "react-router-dom";

const TestCard = ({ test }) => {
  
  const navigate = useNavigate();
  return (
    <div className="border rounded-lg p-4 shadow-sm mb-3">
        <h3 className="text-lg font-semibold">{test.title}</h3>
        <p className="text-sm text-gray-600">
          Scheduled At:{" "}
          {test.scheduledAt
            ? new Date(test.scheduledAt).toLocaleString()
            : "Not scheduled"}
        </p>
        <button onClick={() => navigate(`/examiner/test/${test.id}/results`)}>
            View Results
        </button>
    </div>
  );
};

export default TestCard;
