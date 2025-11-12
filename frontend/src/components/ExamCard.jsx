import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export default function ExamCard({ test, onStartExam }) {
  const navigate = useNavigate();
  const isExpired = test.scheduledAt && new Date(test.scheduledAt) < new Date();

  return (
    <Card className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 ease-in-out">
      <CardHeader className="space-y-1 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-gray-800 truncate">
            {test.title}
          </CardTitle>

          <Badge
            className={`${
              test.attempt
                ? test.attempt.status === "FINISHED"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
                : isExpired
                ? "bg-gray-100 text-gray-700"
                : "bg-blue-100 text-blue-800"
            } text-xs px-3 py-0.5 rounded-full`}
          >
            {test.attempt
              ? test.attempt.status === "FINISHED"
                ? "Completed"
                : "In Progress"
              : isExpired
              ? "Expired"
              : "Upcoming"}
          </Badge>
        </div>

        <p className="text-sm text-gray-500 mt-1">
          Scheduled At:{" "}
          <span className="font-medium text-gray-700">
            {test.scheduledAt
              ? new Date(test.scheduledAt).toLocaleString()
              : "—"}
          </span>
        </p>
      </CardHeader>

      <CardContent className="text-sm text-gray-600 space-y-1">
        <p>
          <span className="font-medium text-gray-700">Duration:</span>{" "}
          {test.duration ? `${test.duration} mins` : "N/A"}
        </p>
        <p>
          <span className="font-medium text-gray-700">Questions:</span>{" "}
          {test.totalQuestions || "--"}
        </p>
      </CardContent>

      <CardFooter className="pt-3">
        {test.attempt ? (
          test.attempt.status === "FINISHED" ? (
            <Button
              onClick={() => navigate(`/result/${test.attempt.id}`)}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium shadow-sm transition"
            >
              View Result
            </Button>
          ) : (
            <Button
              disabled
              className="w-full bg-yellow-400/70 text-gray-800 font-medium cursor-not-allowed"
            >
              In Progress
            </Button>
          )
        ) : isExpired ? (
          <Button
            disabled
            className="w-full bg-gray-300 text-gray-700 font-medium cursor-not-allowed"
          >
            Expired
          </Button>
        ) : (
          <Button
            onClick={() => onStartExam(test.id)}
            className="w-full bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white font-semibold shadow-md"
          >
            Start Exam
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
