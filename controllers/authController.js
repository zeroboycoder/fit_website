const bcrypt = require("bcrypt");
const AuthModel = require("../models/authModel");

exports.getSignUp = (req, res, next) => {
    res.render("auth/signup", {
        title: "Sign Up",
        route: "/sign-up"
    })
}

exports.postSignUp = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const c_password = req.body.c_password;
    AuthModel.findOne({ email: email })
        .then(user => {
            if (user) {
                console.log(`${username} is alredy signup`);
                return;
            }
            if (password === c_password) {
                console.log(password);
                bcrypt.hash(password, 12)
                    .then(hashPassword => {
                        new AuthModel({
                            username: username,
                            email: email,
                            password: hashPassword,
                        }).save()
                            .then(user => {
                                console.log("Create New User");
                                return res.redirect('/auth/login')
                            })
                            .catch()
                    })
                    .catch(err => console.log(err))
            } else {
                console.log("Passwords are not match")
            }
        })
        .catch(err => console.log(err));
}

// GET Login 
exports.getLogin = (req, res, next) => {
    res.render("auth/login", {
        title: "Login",
        route: "/login"
    })
}

// POST Login
exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    AuthModel.findOne({ email: email })
        .then(user => {
            if (!user) {
                console.log(email, "is not exist")
                return;
            }
            bcrypt.compare(password, user.password)
                .then(match => {
                    if (match) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return res.redirect("/");
                    } else {
                        console.log("password didn't match");
                    }
                })
                .catch(err => new Error("Error in bcrypt compare"))
        })
        .catch(err => new Error("Error in user find."))
}

// GET Logout
exports.getLogout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) console.log(err)
        else res.redirect("/");
    })
}