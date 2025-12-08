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
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-50 py-12 px-6 flex flex-col items-center">
      <img
          src="/ShikenXbgr.png"
          alt="ShikenX Logo"
          className="fixed top-6 left-6 h-10 w-auto drop-shadow-md bg-black/30 px-2 py-1 rounded-md z-50"
          onClick={() => navigate('/candidate/dashboard')}
        />

      {/* RESULT SUMMARY CARD */}
      <Card className="w-full max-w-2xl shadow-xl border border-gray-200 rounded-2xl bg-white">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="text-3xl font-semibold text-center text-gray-800">
            🧠 Exam Result
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center py-6 space-y-3">
          <p className="text-lg">
            <span className="font-medium text-gray-700">Score:</span>{" "}
            <span className="text-green-600 font-bold text-xl">
              {result.score}
            </span>{" "}
            / {result.total}
          </p>
          <p className="text-sm text-gray-500">
            You answered{" "}
            <span className="font-semibold text-gray-700">
              {result.details.filter((q) => q.isCorrect).length}
            </span>{" "}
            out of {result.total} correctly.
          </p>

          <Badge
            className={`mt-4 px-4 py-1 text-sm ${
              result.score / result.total >= 0.5
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {result.score / result.total >= 0.5 ? "Passed" : "Needs Improvement"}
          </Badge>
        </CardContent>
      </Card>

      {/* QUESTIONS SECTION */}
      <div className="w-full max-w-3xl mt-10 space-y-6">
        {result.details.map((q, i) => (
          <Card
            key={i}
            className="border border-gray-200 shadow-sm bg-white rounded-xl hover:shadow-lg transition-transform transform hover:-translate-y-1"
          >
            <CardHeader>
              <CardTitle className="text-base font-medium text-gray-800">
                Q{i + 1}. {q.question}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2 text-gray-700">
              <p>
                <span className="font-medium text-gray-800">✔️ Correct Answer:</span>{" "}
                {q.correctOption}
              </p>
              <p>
                <span className="font-medium text-gray-800">🧠 Your Answer:</span>{" "}
                {q.userOption || "Not answered"}
              </p>
              <Badge
                className={`mt-2 px-3 py-1 ${
                  q.isCorrect
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {q.isCorrect ? "Correct" : "Incorrect"}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator className="my-8 w-full max-w-2xl bg-gray-200" />

      <Button
        variant="outline"
        onClick={() => navigate("/candidate/dashboard")}
        className="mt-4 border-gray-300 text-gray-700 hover:bg-gray-100 transition"
      >
        ← Back to Dashboard
      </Button>
    </div>
  );
}

export default ShowResult;
