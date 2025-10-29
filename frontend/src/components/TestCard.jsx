import React from "react";

const TestCard = ({ test }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm mb-3">
      <h3 className="text-lg font-semibold">{test.title}</h3>
      <p className="text-sm text-gray-600">
        Scheduled At:{" "}
        {test.scheduledAt
          ? new Date(test.scheduledAt).toLocaleString()
          : "Not scheduled"}
      </p>
    </div>
  );
};

export default TestCard;
