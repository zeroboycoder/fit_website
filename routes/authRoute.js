const express = require("express");
const route = express.Router();
const authController = require("../controllers/authController");

// GET Sign Up
route.get("/sign-up", authController.getSignUp);

// POST Sign Up
route.post("/sign-up", authController.postSignUp);

// GET Log in
route.get("/login", authController.getLogin);

// POST Log in
route.post("/login", authController.postLogin);

// GET Log out
route.get("/logout", authController.getLogout);
module.exports = route;