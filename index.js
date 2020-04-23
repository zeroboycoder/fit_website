const express = require("express"),
  bodyParser = require("body-parser"),
  app = express(),
  mongoose = require("mongoose"),
  multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().split("T")[0] +
      "_" +
      new Date().toTimeString().split(" ")[0] +
      "_" +
      file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).array("imageUrl", 2)
);
app.use("/images", express.static("images"));

const MONGO_URI = "mongodb://localhost:27017/fit";
const port = process.env.PORT || 3000;

const routes = require("./routes/routes");
app.use("/", routes);
app.use((req, res, next) => {
  res.status(404).render("404", {
    title: "404",
  });
});

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    if (!result) throw new Error("Error in DB result");
    return app.listen(port, () => console.log("Server is running"))
  })
  .catch((err) => {
    throw new Error("Can't connect to DB");
  });
