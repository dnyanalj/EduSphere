import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getExamQuestions, submitExam } from "../api/candidateApi";
import { useNavigate } from "react-router-dom";

function ExamPage() {
  const { attemptId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
//   fetch questions for this exam
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

//   ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐//current is basically the index to track current question.
  const currentQuestion = questions[current];

  const handleAnswer = (option) => {
    setAnswers({ ...answers, [currentQuestion.id]: option });
    // 
  };
  const handleNext = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
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
    <div>
      <h2>Exam</h2>
      <p>
        Question {current + 1} / {questions.length}
      </p>
      <h3>{currentQuestion.text}</h3>

      {currentQuestion.options.map((opt, idx) => (
        <div key={idx}>
          <label>
            <input
                type="radio"
                name={`q-${currentQuestion.id}`}
                checked={answers[currentQuestion.id] === opt}
                onChange={() => handleAnswer(opt)}
            />
            {opt.text}
          </label>
        </div>
      ))}

      <div>
        {current < questions.length - 1 ? (
          <button onClick={handleNext}>Next</button>  
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
}

export default ExamPage;
