import Question from "./question";
import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { fetchFormTemplates } from "./form_templates";

export default function Form() {
  const location = useLocation();
  const template = location.state?.template;
  const useTemplate = location.state?.useTemplate === true;

  const [form, setForm] = useState(() => {
    if (useTemplate && template) {
      return {
        title: template.title || "",
        questions: (template.questions || []).map((question) => ({
          ...question,
          id: crypto.randomUUID(),
        })),
      };
    }
    const draft = localStorage.getItem("Draft");
    return draft ? JSON.parse(draft) : { title: "", questions: [] };
  });

  useEffect(() => {
    localStorage.setItem("Draft", JSON.stringify(form));
  }, [form]);

  const navigate = useNavigate();

  function updateTitle(newTitle) {
    setForm((prevForm) => ({
      ...prevForm,
      title: newTitle,
    }));
  }

  function addQuestion() {
    const newQuestion = {
      id: Date.now(),
      text: "",
      type: "",
      required: false,
      choices: [],
    };
    setForm({
      ...form,
      questions: [...form.questions, newQuestion],
    });
  }

  function updateQuestion(id, updatedFields) {
    setForm({
      ...form,
      questions: form.questions.map((question) =>
        question.id === id ? { ...question, ...updatedFields } : question,
      ),
    });
  }

  function deleteQuestion(id) {
    setForm({
      ...form,
      questions: form.questions.filter((question) => question.id !== id),
    });
  }

  function addChoice(questionId) {
    setForm({
      ...form,
      questions: form.questions.map((question) => {
        if (question.id !== questionId) return question;

        const newChoice = {
          id: Date.now(),
          text: "",
        };

        return {
          ...question,
          choices: [...question.choices, newChoice],
        };
      }),
    });
  }

  function updateChoice(questionId, choiceId, newText) {
    setForm({
      ...form,
      questions: form.questions.map((question) => {
        if (question.id !== questionId) return question;

        return {
          ...question,
          choices: question.choices.map((choice) =>
            choice.id === choiceId ? { ...choice, text: newText } : choice,
          ),
        };
      }),
    });
  }

  function removeChoice(questionId, choiceId) {
    setForm({
      ...form,
      questions: form.questions.map((question) => {
        if (question.id !== questionId) return question;

        if (question.choices.length <= 2) {
          return question; // prevent removing below 2
        }

        return {
          ...question,
          choices: question.choices.filter((choice) => choice.id !== choiceId),
        };
      }),
    });
  }

  function moveQuestionUp(questionId) {
    const index = form.questions.findIndex((q) => q.id === questionId);

    if (index <= 0) return;

    const newQuestions = [...form.questions];

    [newQuestions[index - 1], newQuestions[index]] = [
      newQuestions[index],
      newQuestions[index - 1],
    ];

    setForm({
      ...form,
      questions: newQuestions,
    });
  }

  function moveQuestionDown(questionId) {
    const index = form.questions.findIndex((q) => q.id === questionId);

    if (index === -1 || index >= form.questions.length - 1) return;

    const newQuestions = [...form.questions];

    [newQuestions[index], newQuestions[index + 1]] = [
      newQuestions[index + 1],
      newQuestions[index],
    ];

    setForm({
      ...form,
      questions: newQuestions,
    });
  }

  function validForm() {
    if (form.questions.length === 0) return false;

    for (const question of form.questions) {
      if (question.text.trim() === "") return false;

      if (question.type === "") return false;
      if (question.type === "multiple") {
        if (question.choices.length < 2) return false;
      }
    }

    return true;
  }

  function saveForm(form) {
    localStorage.removeItem("Draft");
    localStorage.setItem(form.title + " - Saved", JSON.stringify(form));
    alert("Form saved successfully!");
  }

  return (
    <div>
      <h2 style={{ marginBottom: "20px" }}>Build your form!</h2>

      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="form-title">Form Title:</label>
        <input
          type="text"
          id="form-title"
          value={form.title}
          onChange={(e) => updateTitle(e.target.value)}
        />
      </div>

      {form.questions.map((question) => {
        return (
          <Question
            key={question.id}
            question={question}
            updateQuestion={updateQuestion}
            addChoice={addChoice}
            updateChoice={updateChoice}
            removeChoice={removeChoice}
            moveQuestionUp={moveQuestionUp}
            moveQuestionDown={moveQuestionDown}
            deleteQuestion={deleteQuestion}
          />
        );
      })}
      <Button variant="primary" id="add-question" onClick={addQuestion}>
        Add a question
      </Button>

      {form.questions.length > 0 && (
        <div>
          <Button
            variant="secondary"
            onClick={() => validForm() && navigate("/preview-form")}
          >
            Preview Form
          </Button>
          <Button
            variant="primary"
            onClick={() => validForm() && saveForm(form)}
          >
            Save Form
          </Button>
        </div>
      )}
    </div>
  );
}
