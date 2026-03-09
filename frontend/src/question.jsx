import React from "react";

export default function Question({ id }) {
  return (
    <div>
      <label>Question Text:</label>
      <input type="text"></input>
      <select name="question-type" id={`question-type-${id}`}>
        Question Type
        <option value="">Select the type of question</option>
        <option value="text">Short text</option>
        <option value="multiple">Multiple Choice</option>
      </select>
    </div>
  );
}
