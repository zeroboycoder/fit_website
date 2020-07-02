const projectDatas = require("../models/projectModel");
const blogModel = require("../models/blogModel")
const authModel = require("../models/authModel");

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
  const page = +req.query.page || 1;
  const category = req.query.category || "all";
  const sort = req.query.sort || "default";
  let totalPosts;
  const postPerPage = 2;
  blogModel.find()
    .countDocuments()
    .then(numberofPost => {
      totalPosts = numberofPost;
      return (category === "all" && (sort === "default" || sort === "newToOld")) ?
        blogModel.find().sort({ _id: -1 }).skip((page - 1) * postPerPage).limit(postPerPage) :
        blogModel.find({ category: category }).sort({ _id: 1 }).skip((page - 1) * postPerPage).limit(postPerPage)
    })
    .then(posts => {
      res.render("views/blog", {
        title: "Blogs",
        route: "/blog",
        posts: posts,
        hasPreviousPage: page - 1 > 0,
        hasNextPage: totalPosts > (page * postPerPage),
        nextPage: page + 1,
        previousPage: page - 1,
        currentPage: page,
        lastPage: Math.ceil(totalPosts / postPerPage)
      })
    })
    .catch(err => new Error("Error in get blog"));
}

// Get Blog Detail
exports.getBlogDetail = (req, res, next) => {
  const postId = req.params.id;
  blogModel.findOne({ _id: postId })
    .then(post => {
      blogModel.find().sort({ _id: -1 }).limit(3)
        .then(latestPost => {
          res.render("views/blogDetail", {
            title: post.title,
            route: "/blog",
            post: post,
            latestPost: latestPost
          })
        })
    })
    .catch(err => console.log(err))
}

// Get User Profile
exports.getUserProfile = (req, res, next) => {
  const userId = req.params.userId;
  authModel.findById(userId).populate("blogs").exec()
    .then(blogs => console.log(blogs._id))
    .catch(err => console.log(err))
}