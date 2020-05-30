const projectDatas = require("../models/projectModel");
const blogModel = require("../models/blogModel");

// Get Add Project
exports.getAddProject = (req, res, next) => {
    res.render("admin/addProject", {
        title: "Add Project",
        route: "/addProject",
    });
};

// Post Add Project
exports.postAddProject = (req, res) => {
    const projectType = req.body.projectType;
    const projectTitle = req.body.projectTitle;
    const creator = req.body.creator;
    let iconUrl = req.files[0].filename;
    let imageUrl = req.files[1].filename;
    const description = req.body.description;
    const downloadLink = req.body.downloadLink;
    const sourceCodeLink = req.body.sourceCodeLink;
    return new projectDatas({
        projectType: projectType,
        projectTitle: projectTitle,
        creator: creator,
        iconUrl: iconUrl,
        imageUrl: imageUrl,
        description: description,
        downloadLink: downloadLink,
        sourceCodeLink: sourceCodeLink,
    })
        .save()
        .then(() => res.redirect("/projects?pType=" + projectType))
        .catch((err) => {
            console.log(err);
        });
};

// Get Add Blog
exports.getAddBlog = (req, res, next) => {
    res.render("admin/addBlog", {
        title: "Blog",
        route: "/add-blog"
    })
}

// POST Add Blog
exports.postAddBlog = (req, res, next) => {
    const title = req.body.blogTitle;
    const category = req.body.category;
    const image = req.file.originalname;
    const script = req.body.script;
    const userId = req.session.user._id;
    const userName = req.session.user.username;

    // Date Feature
    const intiDate = new Date().toLocaleDateString();
    const intiTime = new Date().toLocaleTimeString();
    const time = [intiDate, intiTime].concat();

    // Save post in database
    new blogModel({
        title: title,
        category: category,
        imageUrl: image,
        script: script,
        userId: userId,
        userName: userName,
        time: time
    }).save()
        .then(success => {
            return res.redirect("/blog");
        })
        .catch(err => {
            console.log(err);
            new Error("Error in post add blog")
        })
}