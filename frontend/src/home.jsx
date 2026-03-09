import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TemplateList from "./template_list";

export default function Home() {
  const navigate = useNavigate();

  function handleSelectTemplate(template) {
    navigate("/new-form", { state: { template, useTemplate: true } });
  }

  return (
    <div>
      <h1 id="title">Welcome to FormForge!</h1>
      <h4>
        FormForge is a place to build any form you need. Start from scratch or
        modify one of our existing templates to suit your needs.
      </h4>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        <div>
          <h2>Start from scratch</h2>
          <Button
            id="blank-form-btn"
            variant="primary"
            onClick={() => {
              navigate("/new-form");
            }}
          >
            Create New Form
          </Button>
        </div>

        <TemplateList onSelectTemplate={handleSelectTemplate} />
      </div>
    </div>
  );
}
