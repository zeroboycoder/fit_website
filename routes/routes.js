const express = require("express");
const route = express.Router();
const multer = require("multer");
const controllers = require("../controllers/controllers");

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(
            null, file.originalname
        );
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// Index Route
route.get("/", controllers.getIndex);

// Add Project Route
route.get("/add-project", controllers.getAddProject);

// Post Add Project Route
route.post("/postAddProject", multer({ storage: fileStorage, fileFilter: fileFilter }).array("imageUrl", 2), controllers.postAddProject);

// Get Projects Route
route.get("/projects", controllers.getProjects);

// Get Project's Detail Route
route.get("/projects/:projectId", controllers.getProjectDetail)

// Get Add Blog
route.get("/add-blog", controllers.getAddBlog)

// Get Blog
route.get("/blog", controllers.getBlog)

module.exports = route;