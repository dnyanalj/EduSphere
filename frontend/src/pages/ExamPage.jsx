// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getExamQuestions, submitExam } from "../api/candidateApi";
// import { useNavigate } from "react-router-dom";

// function ExamPage() {
//   const { attemptId } = useParams();
//   const [questions, setQuestions] = useState([]);
//   const [current, setCurrent] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const navigate = useNavigate();
// //   fetch questions for this exam
//   useEffect(() => {
//     async function fetchQuestions() {
//           try {
//             const res = await getExamQuestions(attemptId);
//             setQuestions(res.data.questions);
//           } catch (err) {
//             console.error("Error fetching questions:", err);
//             alert("Failed to load exam. Please try again later.");
//           }
//     }
//     fetchQuestions();
//   }, [attemptId]);

//   if (questions.length === 0) return <p>Loading questions...</p>;

// //   ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//current is basically the index to track current question.
//   const currentQuestion = questions[current];

//   const handleAnswer = (option) => {
//     setAnswers({ ...answers, [currentQuestion.id]: option });
//     //
//   };
//   const handleNext = () => {
//     if (current < questions.length - 1) setCurrent(current + 1);
//   };
//   const handleSubmit = async () => {
//     try {

//       await submitExam(attemptId, answers);
//       alert("✅ Exam submitted successfully!");
//       navigate("/candidate/dashboard");

//     } catch (err) {
//       alert("❌ Error submitting exam");
//       console.error(err);
//     }
//   };

//   return (
//     <div>

//       <h2>Exam</h2>
//       <p>
//         Question {current + 1} / {questions.length}
//       </p>
//       <h3>{currentQuestion.text}</h3>
//       {currentQuestion.options.map((opt, idx) => (
//         <div key={idx}>
//           <label>
//             <input
//                 type="radio"
//                 name={`q-${currentQuestion.id}`}
//                 checked={answers[currentQuestion.id] === opt}
//                 onChange={() => handleAnswer(opt)}
//             />
//             {opt.text}
//           </label>
//         </div>
//       ))}
//       <div>
//         {current < questions.length - 1 ? (
//           <button onClick={handleNext}>Next</button>
//         ) : (
//           <button onClick={handleSubmit}>Submit</button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ExamPage;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExamQuestions, submitExam } from "../api/candidateApi";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

function ExamPage() {
  const { attemptId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await getExamQuestions(attemptId);
        setQuestions(res.data.questions);
      } catch (err) {
        console.error("Error fetching questions:", err);
        alert("Failed to load exam. Please try again later.");
      }
    }
    fetchQuestions();
  }, [attemptId]);

  if (questions.length === 0) return <p>Loading questions...</p>;

  const currentQuestion = questions[current];
  // counting answered questions for progress calculation
const answeredCount = Object.keys(answers).length;
const progress = (answeredCount / questions.length) * 100;


  const handleAnswer = (option) => {
    setAnswers({ ...answers, [currentQuestion.id]: option });
  };

  const handleNext = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleSubmit = async () => {
    try {
      await submitExam(attemptId, answers);
      alert("✅ Exam submitted successfully!");
      navigate("/candidate/dashboard");
    } catch (err) {
      alert("❌ Error submitting exam");
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Progress */}
      <div>
        <Progress
          value={progress}
          className="w-full h-3 bg-gray-200 [&>div]:bg-purple-600"
        />

        <p className="text-sm text-muted-foreground mt-1">
          {Math.round(progress)}% completed
        </p>
      </div>

      {/* Question Card */}
      <Card>
        <CardHeader>
          <CardTitle>
            Question {current + 1} of {questions.length}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-lg">{currentQuestion.text}</p>

          <RadioGroup
            value={answers[currentQuestion.id]}
            onValueChange={(value) => handleAnswer(value)}
          >
            {currentQuestion.options.map((opt, idx) => (
              <div key={idx} className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value={opt} id={`opt-${idx}`} />
                <label
                  htmlFor={`opt-${idx}`}
                  className="cursor-pointer text-sm"
                >
                  {opt.text}
                </label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrev}
              className={current === 0 ? "opacity-50 pointer-events-none" : ""}
            />
          </PaginationItem>

          {questions.map((_, index) => {
            if (index === current) {
              return (
                <PaginationItem key={index}>
                  <PaginationLink isActive>{index + 1}</PaginationLink>
                </PaginationItem>
              );
            } else if (
              index === current - 1 ||
              index === current + 1 ||
              index === 0 ||
              index === questions.length - 1
            ) {
              return (
                <PaginationItem key={index}>
                  <PaginationLink onClick={() => setCurrent(index)}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              );
            } else if (index === current + 2 || index === current - 2) {
              return (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            } else {
              return null;
            }
          })}

          <PaginationItem>
            <PaginationNext
              onClick={handleNext}
              className={
                current === questions.length - 1
                  ? "opacity-50 pointer-events-none"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Finish Test
          </Button>
        </div>
      
    </div>
  );
}

export default ExamPage;
