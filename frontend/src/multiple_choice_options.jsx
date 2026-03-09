import React from "react";
import { Button } from "react-bootstrap";

export default function MultipleChoiceOptions({
  question,
  addChoice,
  updateChoice,
  removeChoice,
}) {
  return (
    <div style={{ marginTop: "0.75rem" }}>
      <h4>Choices</h4>

      {question.choices.map((choice, index) => (
        <div key={choice.id}>
          <label htmlFor={`choice-${question.id}-${choice.id}`}>
            Choice {index + 1}:
          </label>
          <input
            id={`choice-${question.id}-${choice.id}`}
            type="text"
            value={choice.text}
            onChange={(e) =>
              updateChoice(question.id, choice.id, e.target.value)
            }
          />
          <Button
            variant="danger"
            disabled={question.choices.length <= 2}
            onClick={() => removeChoice(question.id, choice.id)}
          >
            Remove
          </Button>
        </div>
      ))}

      <Button variant="secondary" onClick={() => addChoice(question.id)}>
        Add choice
      </Button>
    </div>
  );
}
