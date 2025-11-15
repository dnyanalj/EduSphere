import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, BarChart3 } from "lucide-react";

const ExaminerCard = ({ test }) => {
  const navigate = useNavigate();

  const now = new Date();
  let badgeText = "Error";
  let badgeClass = "bg-red-100 text-red-800 border border-red-200";

  if (test.scheduledAt) {
    const scheduledDate = new Date(test.scheduledAt);
    if (scheduledDate > now) {
      badgeText = "Scheduled";
      badgeClass = "bg-blue-100 text-blue-800 border border-blue-200";
    } else {
      badgeText = "Expired";
      badgeClass = "bg-gray-100 text-gray-700 border border-gray-200";
    }
  }

  return (
    <Card className="group relative border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold tracking-tight text-gray-800 dark:text-gray-100">
            {test.title}
          </CardTitle>
          <Badge className={`${badgeClass} text-xs font-medium px-2 py-1`}>
            {badgeText}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <CalendarDays className="w-4 h-4" />
          <span>
            {test.scheduledAt
              ? new Date(test.scheduledAt).toLocaleString()
              : "Not scheduled"}
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <BarChart3 className="w-4 h-4" />
          <span>Results</span>
        </div>
        <Button
          onClick={() => navigate(`/examiner/test/${test.id}/results`)}
          className="transition-all bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm hover:shadow-md"
          size="sm"
        >
          View Results →
        </Button>
      </CardFooter>

      {/* subtle gradient border effect */}
      <div className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40" />
    </Card>
  );
};

export default ExaminerCard  ;
