const projectDatas = require("../models/projectModel");
const blogModel = require("../models/blogModel")

// Index Page
exports.getIndex = (req, res) => {
  res.render("views/index", {
    title: "Future Information Technology",
    route: "/",
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
      res.render("views/projects", {
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
      res.render("views/projectDetail", {
        title: project.projectTitle,
        route: "/projects",
        project: project
      })
    })
    .catch(err => {
      throw new Error("Error in getProjectDetail");
    })
}


// Get Blog
exports.getBlog = (req, res, next) => {
  res.setHeader(
    "Content-Type", "application/json"
  )
  blogModel.find()
    .then(posts => {
      res.render("views/blog", {
        title: "Blogs",
        route: "/blog",
        posts: posts
      })
    })
    .catch(err => new Error("Error in get blog"));
}