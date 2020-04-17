exports.getIndex = (req, res) => {
    res.render("index", {
        title : "Future Information Technology"
    })
}

exports.getAddProject = (req, res, next) => {
    res.render("addProject", {
        title : "Add Project"
    })
}

exports.postAddProject = (req, res) => {
    const projectType = req.body.projectType;
    const projectTitle = req.body.projectTitle;
    const creator = req.body.creator;
    const imageUrl = req.file.filename;
    // const iconUrl = req.file.filename;
    const description = req.body.description;
    const downloadLink = req.body.downloadLink;
    const sourceCodelink = req.body.sourceCodelink;
    console.log(imageUrl);
}

exports.getProjects = (req, res) => {
    const projectName = req.query.pname;
    res.send(`Project Name ${projectName}`);
}