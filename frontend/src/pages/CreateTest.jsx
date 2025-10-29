import React, { useState } from "react";
import { createTest } from "../api/examinerApi";

function CreateTest() {
  const [title, setTitle] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [questions, setQuestions] = useState([
    { text: "", options: ["", "", "", ""], answerIndex: 0 },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createTest({ title, scheduledAt, questions });
    console.log(res.data);
    alert("Test created successfully!");
  };

  return (
    <div className="p-4">
        <h2>Create Test</h2>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Test Title" />
        <input type="datetime-local" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} />
        <button onClick={handleSubmit}>Create Test</button>
    </div>
  );
}

export default CreateTest;
