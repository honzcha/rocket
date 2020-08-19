import React, { useState } from "react";

import "./App.css";
import backgroundImage from "./assets/image.jpg";

import Header from "./components/Header";

function App() {
  const [projects, setProjects] = useState([
    "Desenvolvimento app",
    "Front web",
  ]);

  function handleAddProject() {
    // projects.push(`Novo Projeto ${Date.now()}`);

    setProjects([...projects, `Novo Projeto ${Date.now()}`]);
  }
  return (
    <>
      <Header title="Projects" />
      <img src={backgroundImage} />
      <ul>
        {projects.map((project) => (
          <li key={project}>{project}</li>
        ))}
      </ul>
      <button type="button" onClick={handleAddProject}>
        Click
      </button>
    </>
  );
}

export default App;
