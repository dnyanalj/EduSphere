// candidateDashboard

import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function ExamCard({ test, onStartExam }) {
    const navigate = useNavigate();
  return (
    <Card className="shadow-sm hover:shadow-md transition border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{test.title}</CardTitle>
        <p className="text-sm text-gray-500">
          {new Date(test.scheduledAt).toLocaleString()}
        </p>
      </CardHeader>

      <CardContent>
        <p className="text-gray-600 text-sm mb-2">Duration: {test.duration || "N/A"} mins</p>
        <p className="text-gray-500 text-sm">
          Questions: {test.totalQuestions || "--"}
        </p>
      </CardContent>

      <CardFooter>
        {test.attempt ? (
          test.attempt.status === "FINISHED" ? (
            <Button
              onClick={() => navigate(`/result/${test.attempt.id}`)}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              View Result
            </Button>
          ) : (
            <Button disabled className="w-full bg-gray-400">
              In Progress
            </Button>
          )
        ) : (
          <Button
            onClick={() => onStartExam(test.id)}
            className="w-full text-gray-100 bg-black hover:bg-gray-800"
          >
            Start Exam
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
