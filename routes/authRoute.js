const express = require("express");
const route = express.Router();
const multer = require("multer");

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images/avatar")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const authController = require("../controllers/authController");

// GET Sign Up
route.get("/sign-up", authController.getSignUp);

// POST Sign Up
route.post("/sign-up", multer({ storage: fileStorage }).single("avatarIcon"), authController.postSignUp);

module.exports = route;