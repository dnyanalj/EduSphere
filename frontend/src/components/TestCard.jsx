import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const TestCard = ({ test }) => {
  const navigate = useNavigate();
  // Determine badge status based on date
  let badgeText = "Error";
  let badgeClass = "bg-red-100 text-red-800";
  const now = new Date();

  if (test.scheduledAt) {
    const scheduledDate = new Date(test.scheduledAt);

    if (scheduledDate > now) {
      badgeText = "Scheduled";
      badgeClass = "bg-blue-100 text-blue-800";
    } else {
      badgeText = "Expired";
      badgeClass = "bg-gray-200 text-gray-700";
    }
  }

  
  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{test.title}</CardTitle>
          <Badge className={badgeClass}>{badgeText}</Badge>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-600">
          Scheduled At:{" "}
          {test.scheduledAt
            ? new Date(test.scheduledAt).toLocaleString()
            : "Not scheduled"}
        </p>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/examiner/test/${test.id}/results`)}
        >
          View Results →
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TestCard;
