import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTestResults } from "../api/examinerApi";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ShowResultsExaminer() {
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

  if (!data) return <p className="text-center py-10 text-gray-500">Loading results...</p>;

  return (
    <div className="p-6 md:p-10 from-gray-50 to-white min-h-screen">
      <Card className="max-w-5xl mx-auto shadow-lg border border-gray-200 rounded-2xl bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center justify-between">
            <span className="text-gray-800">
              🧠 {data.testTitle} — <span className="text-gray-500 font-medium">Results</span>
            </span>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {data.results.length} Candidates
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-[400px] rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 hover:bg-gray-100">
                  <TableHead className="text-gray-700 text-center font-semibold">Candidate ID</TableHead>
                  <TableHead className="text-gray-700 text-center font-semibold">Name</TableHead>
                  <TableHead className="text-gray-700 text-center font-semibold">Score</TableHead>
                  <TableHead className="text-gray-700 text-center font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {data.results.map((r, i) => {
                  const isComplete = r.status === "COMPLETED";
                  const isOngoing = r.status === "ONGOING";
                  const badgeColor = isComplete
                    ? "bg-green-100 text-green-800"
                    : isOngoing
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-700";

                  return (
                    <TableRow
                      key={i}
                      className="hover:bg-gray-50 transition-colors text-center"
                    >
                      <TableCell className="py-3">{r.candidateId}</TableCell>
                      <TableCell className="py-3 font-medium">{r.candidateName}</TableCell>
                      <TableCell className="py-3 font-semibold">
                        {r.score} / {r.totalQuestions}
                      </TableCell>
                      <TableCell className="py-3">
                        <Badge className={`${badgeColor} border-none`}>{r.status}</Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
