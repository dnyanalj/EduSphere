import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getResult } from "../api/candidateApi";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

function ShowResult() {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function fetchResult() {
      try {
        const res = await getResult(attemptId);
        setResult(res.data);
        // console.log(res);
        
      } catch (err) {
        console.error("Error fetching result:", err);
      }
    }
    fetchResult();
  }, [attemptId]);

  if (!result) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Loading result...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 flex flex-col items-center">
      {/* RESULT SUMMARY CARD */}
      <Card className="w-full max-w-2xl shadow-md border">
        
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Exam Result
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center">
          <p className="text-lg">
            <span className="font-medium">Score:</span>{" "}
            <span className="text-green-600 font-bold">
              {result.score}
            </span>{" "}
            / {result.total}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            You answered {result.details.filter((q) => q.isCorrect).length} out of{" "}
            {result.total} correctly.
          </p>
        </CardContent>
        
      </Card>

      {/* QUESTIONS SECTION */}
      <div className="w-full max-w-3xl mt-8 space-y-6">
        {result.details.map((q, i) => (
          <Card
            key={i}
            className="border hover:shadow-md transition-shadow duration-200"
          >
            <CardHeader>
              <CardTitle className="text-base font-medium">
                Q{i + 1}. {q.question}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-2">
              <p>
                <span className="font-medium">✔️ Correct Answer:</span>{" "}
                {q.correctOption}
              </p>
              <p>
                <span className="font-medium">🧠 Your Answer:</span>{" "}
                {q.userOption || "Not answered"}
              </p>
              <Badge
                variant={q.isCorrect ? "success" : "destructive"}
                className="mt-2"
              >
                {q.isCorrect ? "Correct" : "Incorrect"}
              </Badge>
            </CardContent>

          </Card>
        ))}
      </div>

      <Separator className="my-6 w-full max-w-2xl" />

      <Button
        variant="outline"
        onClick={() => navigate("/candidate/dashboard")}
        className="mt-4"
      >
        ← Back to Dashboard
      </Button>
    </div>
  );
}

export default ShowResult;
