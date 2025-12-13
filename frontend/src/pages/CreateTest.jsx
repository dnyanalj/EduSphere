import React, { useState } from "react";
import { createTest } from "../api/examinerApi";
import QuestionModal from "./QuestionModal.jsx";
import { useNavigate } from "react-router-dom";
import SideBar from "@/components/layout/SideBar.jsx";
import Navbar from "@/components/layout/NavBar.jsx";

function CreateTest() {
  const [title, setTitle] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const navigate = useNavigate();
  // Save new or edited question
  const handleSaveQuestion = (questionData) => {
    if (editingIndex !== null) {
      setQuestions((prev) =>
        prev.map((q, idx) => (idx === editingIndex ? questionData : q))
      );
      setEditingIndex(null);
    } else {
      setQuestions((prev) => [...prev, questionData]);
    }
    setShowModal(false);
  };

  const handleDeleteQuestion = (idx) => {
    setQuestions((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleEditQuestion = (idx) => {
    setEditingIndex(idx);
    setShowModal(true);
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
      const utcIso = new Date(scheduledAt).toISOString();

      const payload = { title, scheduledAt:utcIso, questions};

      // call to the backend
      const res = await createTest(payload);

      alert("✅ Test created successfully!");
      console.log("Created Test:", res.data);
      // Reset form
      setTitle("");
      setScheduledAt("");
      setQuestions([]);
      navigate("/examiner/dashboard");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create test");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar on the left */}
      <SideBar role="examiner" />

      {/* Right side: navbar at top, content below */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6">
          <div className="max-w-xl mx-auto border rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Create New Test</h2>
            <label className="block mb-1 font-medium">Test Title</label>
            <input
              type="text"
              placeholder="Enter test title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full mb-3 p-2 border rounded"
            />
            <label className="block mb-1 font-medium">Test Date & Time</label>
            
            <input
              type="datetime-local"
              placeholder="Enter test date and time"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="block w-full mb-3 p-2 border rounded"
            />
            <p className="text-sm text-gray-600">
              The test can be started only within 10 minutes from the scheduled
              time.
            </p>
            <div className="mb-3 pt-3">
              <h3 className="font-semibold mb-2">
                Questions ({questions.length})
              </h3>

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
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => handleEditQuestion(i)}
                      className="px-3 py-1 rounded border border-blue-500 text-blue-600 hover:bg-blue-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(i)}
                      className="px-3 py-1 rounded border border-red-500 text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
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
          </div>
        </main>

        {showModal && (
          <QuestionModal
            onSave={handleSaveQuestion}
            onCancel={() => {
              setShowModal(false);
              setEditingIndex(null);
            }}
            initialData={editingIndex !== null ? questions[editingIndex] : null}
          />
        )}
      </div>
    </div>
  );
}

export default CreateTest;
