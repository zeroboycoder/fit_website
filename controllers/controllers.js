const projectDatas = require("../models/projectModel");

// Index Page
exports.getIndex = (req, res) => {
  res.render("index", {
    title: "Future Information Technology",
    route: "/",
  });
};


// Get Add Project
exports.getAddProject = (req, res, next) => {
  res.render("addProject", {
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


// Get Projects Page
exports.getProjects = (req, res) => {
  const projectType = req.query.pType;
  let page = +req.query.page || 1;
  let itemsPerPage = 8;
  let totalItems;
  projectDatas
    .find({ projectType: projectType })
    .countDocuments()
    .then(numOfProjects => {
      totalItems = numOfProjects;
      return projectDatas.find({ projectType: projectType }).skip((page - 1) * itemsPerPage).limit(itemsPerPage)
    })
    .then((projects) => {
      res.render("projects", {
        title: "Projects Section",
        projectType: projectType,
        projects: projects,
        route: "/projects",
        hasNextPage: totalItems > (page * itemsPerPage),
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        currentPage: page,
        lastPage: Math.ceil(totalItems / itemsPerPage)
      });
    })
    .catch((err) => {
      throw new Error("Error in finding projects");
    });
};

// Get Project's Detail
exports.getProjectDetail = (req, res, next) => {
  const projectId = req.params.projectId;
  projectDatas.findById(projectId)
    .then(project => {
      res.render("projectDetail", {
        title: project.projectTitle,
        route: "/projects",
        project: project
      })
    })
    .catch(err => {
      throw new Error("Error in getProjectDetail");
    })
}