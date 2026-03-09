import React from "react";

export default function TemplateCard({ template, onSelect }) {
  return (
    <div>
      <h3>{template.title}</h3>
      <p>{template.description}</p>
      <button onClick={() => onSelect(template)}>Use Template</button>
    </div>
  );
}
