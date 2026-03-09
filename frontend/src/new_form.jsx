import Question from "./question";
import React from "react";
import { Button } from "react-bootstrap";
import { useState } from "react";

export default function Form() {
  const [questions, setQuestions] = useState([]);

  function addQuestion() {
    setQuestions([...questions, { id: Date.now() }]);
  }

  return (
    <div>
      <h2>Build your form!</h2>

      {questions.map((question) => {
        return <Question key={question.id} id={question.id} />;
      })}
      <Button variant="primary" id="add-question" onClick={addQuestion}>
        Add a question
      </Button>
    </div>
  );
}
