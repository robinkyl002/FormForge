import React, { useEffect, useState } from "react";
import TemplateCard from "./template_card";
import localTemplates from "./templates.json";

function todoToQuestion(todo) {
  const isMultipleChoice = Math.random() > 0.6;

  if (isMultipleChoice) {
    return {
      id: todo.id,
      type: "multiple",
      text: todo.title,
      required: false,
      choices: ["Option A", "Option B", "Option C"],
    };
  }

  return {
    id: todo.id,
    type: "text",
    text: todo.title,
    required: false,
    choices: [],
  };
}

function todosToTemplates(todos) {
  const templates = [];
  const QUESTIONS_PER_TEMPLATE = 5;

  for (let i = 0; i < todos.length; i += QUESTIONS_PER_TEMPLATE) {
    const group = todos.slice(i, i + QUESTIONS_PER_TEMPLATE);

    templates.push({
      id: Math.floor(i / QUESTIONS_PER_TEMPLATE) + 1,
      title: `Template ${Math.floor(i / QUESTIONS_PER_TEMPLATE) + 1}`,
      description: "Generated from JSONPlaceholder todos",
      questions: group.map(todoToQuestion),
    });
  }

  return templates;
}

export default function TemplateList({ onSelectTemplate }) {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTemplates() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos",
        );

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const todos = await response.json();

        const templates = todosToTemplates(todos.slice(0, 20));
        setTemplates(templates);
      } catch (error) {
        alert(
          "Could not load templates from JSONPlaceholder. Using local fallback templates.",
        );
        setTemplates(localTemplates);
      } finally {
        setLoading(false);
      }
    }
    loadTemplates();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading templates...</p>
      ) : (
        <div>
          <h2>Choose a Template</h2>

          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onSelect={onSelectTemplate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
