const { Router } = require("express");
const {
  addProject,
  getProject,
  countProjects,
  chartProject,
  updateStatus,
} = require("../controllers/project.controller");

const ProjectRouter = Router();

ProjectRouter.post("/addProject", addProject);

ProjectRouter.get("/", getProject);

ProjectRouter.get("/count", countProjects);

ProjectRouter.get("/chart", chartProject);

ProjectRouter.put("/updateStatus", updateStatus);

module.exports = {
  ProjectRouter,
};
