const express = require("express");

const app = express();

app.get("/project", (request, response) => {
  const { title, owner} = request.query;

  console.log(title, owner)

  return response.json(["Project 1", "Project 2"]);
});

app.post("/project", (request, response) => {
  return response.json(["Project 1", "Project 2", "Project 3"]);
});

app.put("/project/:id", (request, response) => {
const params = request.params;

  return response.json(["Project 4", "Project 2", "Project 3"]);
});

app.delete("/project/:id", (request, response) => {
  return response.json(["Project 2", "Project 3"]);
});

app.listen(3333, () => {
  console.log("🚀 Back-end started");
});
