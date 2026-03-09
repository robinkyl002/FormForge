import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";

export default function Preview({ form }) {
  form = JSON.parse(localStorage.getItem("Draft"));

  const [responses, setResponses] = useState({});

  function updateResponse(questionId, response) {
    setResponses({
      ...responses,
      [questionId]: response,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(responses);
  }

  function requiredQuestionsAnswered() {
    for (const question of form.questions) {
      if (question.required && !responses[question.id]) {
        return false;
      }
    }
    return true;
  }

  return (
    <div>
      {/* <h1>Preview form coming soon!</h1> */}
      <form onSubmit={handleSubmit}>
        <h2>{form.title}</h2>
        {form.questions.map((question) => (
          <div key={question.id}>
            <label>{question.text}</label>
            {question.type === "text" && (
              <input
                type="text"
                onChange={(event) =>
                  updateResponse(question.id, event.target.value)
                }
              />
            )}
            {question.type === "multiple" &&
              question.choices.map((choice) => (
                <div key={choice.id}>
                  <input
                    type="radio"
                    id={`choice-${question.id}-${choice.id}`}
                    name={`question-${question.id}`}
                    value={choice.text}
                    onChange={(event) =>
                      updateResponse(question.id, event.target.value)
                    }
                  />
                  <label htmlFor={`choice-${question.id}-${choice.id}`}>
                    {choice.text}
                  </label>
                </div>
              ))}
          </div>
        ))}

        <Button type="submit" variant="primary">
          Submit
        </Button>
      </form>
    </div>
  );
}
