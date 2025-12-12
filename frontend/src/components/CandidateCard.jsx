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

export default function CandidateCard({ test, onStartExam }) {
  const navigate = useNavigate();
  
  // Calculate start window status (treat stored datetime as local for display and comparison)
  const now = new Date();
  let windowStatus = null; // 'too-early' | 'in-window' | 'window-closed'
  let windowEndTime = null;
  let startDisplay = null;
  
  if (test.scheduledAt) {
    const startTime = new Date(test.scheduledAt);
    const isToday =
      startTime.getFullYear() === now.getFullYear() &&
      startTime.getMonth() === now.getMonth() &&
      startTime.getDate() === now.getDate();
    
    startDisplay = isToday
      ? startTime.toLocaleTimeString()
      : startTime.toLocaleString();

    windowEndTime = new Date(startTime.getTime() + 10 * 60 * 1000); // +10 minutes
    
    if (now < startTime) {
      windowStatus = 'too-early';
    } else if (now >= startTime && now <= windowEndTime) {
      windowStatus = 'in-window';
    } else {
      windowStatus = 'window-closed';
    }
  }

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
                ? "bg-green-100 text-green-800"
                : windowStatus === 'window-closed'
                ? "bg-gray-100 text-gray-700"
                : windowStatus === 'too-early'
                ? "bg-purple-100 text-purple-800"
                : "bg-blue-100 text-blue-800"
            } text-xs px-3 py-0.5 rounded-full`}
          >
            {test.attempt
              ? "Completed"
              : windowStatus === 'window-closed'
              ? "Window Closed"
              : windowStatus === 'too-early'
              ? "Upcoming"
              : "Available"}
          </Badge>
        </div>

        <p className="text-sm text-gray-500 mt-1">
          Start Time:{" "}
          <span className="font-medium text-gray-700">
            {startDisplay || "—"}
          </span>
          <span className="ml-1 text-xs text-gray-400">(local time)</span>
        </p>
        {test.scheduledAt && windowStatus === 'in-window' && (
          <p className="text-xs text-orange-600 mt-1">
            ⏰ Window closes at {windowEndTime.toLocaleTimeString()}
          </p>
        )}
      </CardHeader>

      <CardContent className="text-sm text-gray-600 space-y-1">
        <p>
          <span className="font-medium text-gray-700">Duration:</span>{" "}
          {test.duration ? `${test.duration} mins` : "N/A"}
        </p>
        {/* <p>
          <span className="font-medium text-gray-700">Questions:</span>{" "}
          {test.totalQuestions || "--"}
        </p> */}
      </CardContent>

      <CardFooter className="pt-3">
        {test.attempt ? (
          <Button
            onClick={() => navigate(`/result/${test.attempt.id}`)}
            className="w-full  bg-green-600  hover:bg-green-700 text-white font-medium shadow-sm transition"
          >
            View Result
          </Button>
        ) : windowStatus === 'window-closed' ? (
          <Button
            disabled
            className="w-full bg-red-500 text-white font-medium cursor-not-allowed"
          >
            Window Closed
          </Button>
        ) : windowStatus === 'too-early' ? (
          <Button
            disabled
            className="w-full bg-gray-400 text-white font-medium cursor-not-allowed"
          >
            {startDisplay ? `Starts at ${startDisplay}` : "Start time not set"}
          </Button>
        ) : windowStatus === 'in-window' ? (
          <Button
            onClick={() => onStartExam(test.id)}
            className="w-full bg-blue-500  hover:bg-blue-700 text-white font-semibold shadow-md"
          >
            Start Exam
          </Button>
        ) : (
          <Button
            disabled
            className="w-full bg-gray-400 text-white font-medium cursor-not-allowed"
          >
            Start time not set
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
