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
      new Date().toISOString().split("T")[0] + " " + new Date().toTimeString().split(" ")[0] + " - " + file.originalname
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
app.use(multer({storage : fileStorage, fileFilter : fileFilter}).single('imageUrl'));
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

mongoose.connect(
  MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) return new Error("MongoDb error");
    app.listen(port, () => console.log("Server is running"));
  }
);
