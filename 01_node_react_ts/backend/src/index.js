const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");
const { response } = require("express");

const app = express();

app.use(cors());
app.use(express.json());

const projects = [];

function logRequests(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel);

  //without adding next here, the middleware will stop anything from happening after.
  return next();
}

function validateProjectID(request, reponse, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    //use return here so that if it comes to this point, it gives an error and does not run anything after this
    return response.status(400).json({ error: "Invalid project ID" });
  }

  return next();
}

app.use(logRequests);
app.use("/repositories/:id", validateProjectID);

// You can also add the middleware inside the
// app.get("/projects", logRequests, middleware2, middleware3(request, response) => {

app.get("/repositories", (request, response) => {
  const { title } = request.query;

  const results = title
    ? projects.filter((project) => project.title.includes(title))
    : projects;

  return response.json(results);
});

app.post("/repositories", (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);

  // always show the recent created project. not the full array

  return response.json(project);
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const projectIndex = repositories.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "Id not found" });
  }
  repositories[projectIndex].likes += 1;

  console.log(repositories[projectIndex].likes);

  return response.json(repositories[projectIndex]);
});

app.put("/repositories/:id", (request, response) => {
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

app.delete("/repositories/:id", (request, response) => {
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
