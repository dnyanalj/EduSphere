import React from 'react'

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";


const COLORS = ["#0f766e", "#14b8a6", "#2dd4bf", "#99f6e4", "#0d9488"];

const GraphCandidate = ({analytics,pieData}) => {
  return (
    <div>
      <div className="p-6 space-y-6 overflow-y-auto">

            <h1 className="text-2xl font-bold tracking-tight">
              Performance Analytics
            </h1>

            <Separator />

            {/* Score Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <Card className="shadow-sm border">
                <CardHeader>
                  <CardTitle>Overall Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-emerald-600">
                    {analytics.score}%
                  </p>
                  <Progress value={analytics.score} className="mt-3" />
                </CardContent>
              </Card>

              <Card className="shadow-sm border">
                <CardHeader>
                  <CardTitle>Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-teal-600">
                    {analytics.accuracy}%
                  </p>
                  <Progress value={analytics.accuracy} className="mt-3" />
                </CardContent>
              </Card>

              <Card className="shadow-sm border">
                <CardHeader>
                  <CardTitle>Questions Overview</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-700">
                  <p>Total: {analytics.totalQuestions}</p>
                  <p className="text-emerald-600">Correct: {analytics.correct}</p>
                  <p className="text-red-500">Wrong: {analytics.wrong}</p>
                  <p className="text-gray-500">Skipped: {analytics.skipped}</p>
                </CardContent>
              </Card>

            </div>

            {/* Pie Chart */}
            <Card className="shadow-sm border">
              <CardHeader>
                <CardTitle>Answer Breakdown</CardTitle>
              </CardHeader>
              <CardContent>

                {/* FIXED CHART WRAPPER */}
                <div className="w-full min-w-0 h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {pieData.map((_, index) => (
                          <Cell
                            key={index}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

              </CardContent>
            </Card>

            {/* Topic-wise Performance */}
            <Card className="shadow-sm border">
              <CardHeader>
                <CardTitle>Topic-wise Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {analytics.topicWise.map((t, i) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm font-medium">
                      <span>{t.topic}</span>
                      <span>{t.accuracy}%</span>
                    </div>
                    <Progress value={t.accuracy} />
                  </div>
                ))}
              </CardContent>
            </Card>

          </div>
    </div>
  )
}

export default GraphCandidate
