import React from "react";
import Form from "./new_form";
import Home from "./home";
import Preview from "./preview";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

export default function App() {
  return (
    <BrowserRouter>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              FormForge
            </a>
          </div>
        </nav>
      </header>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/new-form" element={<Form />}></Route>
          <Route path="/preview-form" element={<Preview />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <main className="container-fluid bg-secondary text-center">
      404: Return to sender. Address unknown.
    </main>
  );
}
