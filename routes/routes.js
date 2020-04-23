const express = require("express");
const route = express.Router();

const controllers = require("../controllers/controllers");

// Index Route
route.get("/", controllers.getIndex);

// Add Project Route
route.get("/addProject", controllers.getAddProject);

// Post Add Project Route
route.post("/postAddProject", controllers.postAddProject);

// Get Projects Route
route.get("/projects", controllers.getProjects);

// Get Project's Detail Route
route.get("/projects/:projectId", controllers.getProjectDetail)

module.exports = route;