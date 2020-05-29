const express = require("express");
const route = express.Router();
const multer = require("multer");
const adminController = require("../controllers/adminController");

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

// Add Project Route
route.get("/add-project", adminController.getAddProject);

// Post Add Project Route
route.post("/postAddProject", multer({ storage: fileStorage, fileFilter: fileFilter }).array("imageUrl", 2), adminController.postAddProject);

// Get Add Blog
route.get("/add-blog", adminController.getAddBlog)

// POST Add Blog
route.post("/add-blog", adminController.postAddBlog)

module.exports = route;