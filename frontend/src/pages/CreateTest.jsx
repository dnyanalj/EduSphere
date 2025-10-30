import React, { useState } from "react";
import { createTest } from "../api/examinerApi";
import QuestionModal from "./QuestionModal.jsx";

function CreateTest() {
  const [title, setTitle] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Add new question from modal
  const handleAddQuestion = (questionData) => {
    setQuestions((prev) => [...prev, questionData]);
    setShowModal(false);
  };

  // Handle create test API call
  const handleCreateTest = async () => {
    if (!title.trim() && questions.length === 0) {
      alert("Please enter a title and add at least one question.");
      return;
    }
     if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }
     if (questions.length === 0) {
      alert("Please add at least one question.");
      return;
    }
    try {
      // call to the backend
      const res = await createTest({ title, scheduledAt, questions });

      alert("✅ Test created successfully!");
      console.log("Created Test:", res.data);
      // Reset form
      setTitle("");
      setScheduledAt("");
      setQuestions([]);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create test");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Create New Test</h2>

      {/* take title as ip */}
      <input
        type="text"
        placeholder="Enter test title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block w-full mb-3 p-2 border rounded"
      />

      {/* take scheduled at time */}
      <input
        type="datetime-local"
        value={scheduledAt}
        onChange={(e) => setScheduledAt(e.target.value)}
        className="block w-full mb-3 p-2 border rounded"
      />

      {/* show questions  */}
      <div className="mb-3">
  <h3 className="font-semibold mb-2">Questions ({questions.length})</h3>
  {questions.map((q, i) => (
    <div key={i} className="mb-3 p-3 border rounded bg-gray-50">
      <p className="font-medium mb-2">
        <strong>Q{i + 1}:</strong> {q.text}
      </p>

      <ul className="ml-4 space-y-1">
        {q.options.map((opt, idx) => {
          const isAnswer = q.answerIndex === idx;
          return (
            <li
              key={idx}
              className={`p-2 rounded border ${
                isAnswer
                  ? "bg-green-100 border-green-400 text-green-700 font-semibold flex items-center gap-1"
                  : "border-transparent"
              }`}
            >
              {isAnswer && <span>✅</span>}
              {opt}
            </li>
          );
        })}
      </ul>
    </div>
  ))}
</div>


      <div className="flex gap-2">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          ➕ Add Question
        </button>

        <button
          onClick={handleCreateTest}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          🚀 Create Test
        </button>
      </div>

      {showModal && (
        <QuestionModal
          onSave={handleAddQuestion}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default CreateTest;
