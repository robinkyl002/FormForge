import React from "react";
import { Button } from "react-bootstrap";
import MultipleChoiceOptions from "./multiple_choice_options";

export default function Question({
  question,
  updateQuestion,
  addChoice,
  updateChoice,
  removeChoice,
  moveQuestionUp,
  moveQuestionDown,
  deleteQuestion,
}) {
  function handleTypeChange(e) {
    const newType = e.target.value;

    updateQuestion(question.id, {
      type: newType,
      choices:
        newType === "multiple" && question.choices.length === 0
          ? [
              { id: Date.now(), text: "" },
              { id: Date.now() + 1, text: "" },
            ]
          : newType === "multiple"
            ? question.choices
            : [],
    });
  }
  return (
    <div>
      <label htmlFor={`question-text-${question.id}`}>Question Text:</label>
      <input
        type="text"
        id={`question-text-${question.id}`}
        value={question.text}
        onChange={(e) => updateQuestion(question.id, { text: e.target.value })}
      />
      <select
        name="question-type"
        id={`question-type-${question.id}`}
        value={question.type}
        onChange={(e) => handleTypeChange(e)}
      >
        Question Type
        <option value="">Select the type of question</option>
        <option value="text">Short text</option>
        <option value="multiple">Multiple Choice</option>
      </select>
      <Button variant="secondary" onClick={() => moveQuestionUp(question.id)}>
        ꜛ
      </Button>
      <Button variant="secondary" onClick={() => moveQuestionDown(question.id)}>
        ꜜ
      </Button>
      <Button variant="danger" onClick={() => deleteQuestion(question.id)}>
        Delete Question
      </Button>

      {question.type === "multiple" && (
        <div>
          <label htmlFor={`required-${question.id}`}>Required?</label>
          <input
            type="checkbox"
            id={`required-${question.id}`}
            checked={question.required}
            onChange={(e) =>
              updateQuestion(question.id, { required: e.target.checked })
            }
          />
          <MultipleChoiceOptions
            question={question}
            addChoice={addChoice}
            updateChoice={updateChoice}
            removeChoice={removeChoice}
          />
        </div>
      )}
    </div>
  );
}
