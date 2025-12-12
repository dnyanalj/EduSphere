import React, { useState } from "react";

function QuestionModal({ onSave, onCancel, initialData }) {
  const [text, setText] = useState(initialData?.text || "");
  const [options, setOptions] = useState(
    initialData?.options || ["", "", "", ""]
  );
  const [answerIndex, setAnswerIndex] = useState(
    typeof initialData?.answerIndex === "number" ? initialData.answerIndex : 0
  );
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || options.some((opt) => !opt.trim())) {
      alert("Please fill in all fields.");
      return;
    }

    onSave({ text, options, answerIndex });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-lg font-bold mb-3">
          {initialData ? "Edit Question" : "Add New Question"}
        </h2>

        <input
          type="text"
          placeholder="Enter question text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="block w-full mb-4 p-2 border rounded"
        />

        {options.map((opt, idx) => (
          <div key={idx} className="flex items-center mb-2">
            <input
              type="radio"
              name="correctAnswer"
              checked={answerIndex === idx}
              onChange={() => setAnswerIndex(idx)}
              className="mr-2"
            />
            <input
              type="text"
              placeholder={`Option ${idx + 1}`}
              value={opt}
              onChange={(e) => handleOptionChange(idx, e.target.value)}
              className="flex-1 p-2 border rounded"
            />
          </div>
        ))}

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Question
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionModal;
