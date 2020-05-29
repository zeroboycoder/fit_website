const express = require("express");
const route = express.Router();
const multer = require("multer");
const upload = multer({ dest: "images/test" })

const authController = require("../controllers/authController");

// GET Sign Up
route.get("/sign-up", authController.getSignUp);

// POST Sign Up
route.post("/sign-up", upload.single("avatarIcon"), authController.postSignUp);

module.exports = route;