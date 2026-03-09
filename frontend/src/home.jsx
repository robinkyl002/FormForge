import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 id="title">Welcome to FormForge!</h1>
      <h4>
        FormForge is a place to build any form you need. Start from scratch or
        modify one of our existing templates to suit your needs.
      </h4>
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
  );
}
