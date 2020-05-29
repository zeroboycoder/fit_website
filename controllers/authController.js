const bcrypt = require("bcrypt");
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
    AuthModel.findOne({ email: email })
        .then(user => {
            if (user) {
                console.log(`${username} is alredy signup`);
                return;
            }
            if (password === c_password) {
                bcrypt.hash(password, 12)
                    .then(hashPassword => {
                        new AuthModel({
                            username: username,
                            email: email,
                            password: hashPassword,
                            avatar: req.file.originalname
                        }).save()
                            .then(user => {
                                console.log("Create New User");
                                res.redirect('/')
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