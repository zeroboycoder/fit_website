const AuthModel = require("../models/authModel");

exports.getSignUp = (req, res, next) => {
    res.render("auth/signup", {
        title: "Sign Up",
        route: "/sign-up"
    })
}

exports.postSignUp = (req, res, next) => {
    const avatar = req.file;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const c_password = req.body.c_password;
    if (password === c_password) {

    }
}