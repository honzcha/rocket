const express = require("express");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());

const projects = [];

function logRequests(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel);

  //without adding next here, the middleware will stop anything from happening after.
  return next();
}

// app.use(logRequests);

// You can also add the middlewares inside the 
// app.get("/projects", logRequests, middleware2, middleware3(request, response) => {

app.get("/projects", (request, response) => {
  const { title } = request.query;

  const results = title
    ? projects.filter((project) => project.title.includes(title))
    : projects;

  return response.json(results);
});

app.post("/projects", (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);

  // always show the recent created project. not the full array

  return response.json(project);
});

app.put("/projects/:id", (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "Id not found" });
  }
  const project = { id, title, owner };

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete("/projects/:id", (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "Id not found" });
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();
});

app.listen(3333, () => {
  console.log("🚀 Back-end started");
});
