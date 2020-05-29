const express = require("express");
const route = express.Router();
const controllers = require("../controllers/controllers");

// Index Route
route.get("/", controllers.getIndex);

// Get Projects Route
route.get("/projects", controllers.getProjects);

// Get Project's Detail Route
route.get("/projects/:projectId", controllers.getProjectDetail)

// Get Blog
route.get("/blog", controllers.getBlog)

module.exports = route;