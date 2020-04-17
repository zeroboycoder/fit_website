const express = require("express");
const route = express.Router();

const controllers = require("../controllers/controllers");

route.get("/", controllers.getIndex);

route.get("/addProject", controllers.getAddProject);

route.post("/postAddProject", controllers.postAddProject);

route.get("/projects", controllers.getProjects);

module.exports = route;