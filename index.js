const express = require("express"),
  bodyParser = require("body-parser"),
  app = express(),
  mongoose = require("mongoose"),
  session = require("express-session"),
  mongoStore = require("connect-mongodb-session")(session);

app.set("view engine", "ejs");
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/images", express.static("images"));

// const MONGO_URI = "mongodb://localhost:27017/fit";
const MONGO_URI = `mongodb+srv://pyaesonekhant:Py@esonekh@nt27@cluster0-xxkux.mongodb.net/fit`

const store = new mongoStore({
  uri: MONGO_URI,
  collection: "session"
})

app.use(session({
  secret: "FIT WEBSITE",
  resave: false,
  saveUninitialized: false,
  store: store
}))

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.user = req.session.user;
  next();
})


const routes = require("./routes/routes");
const authRoutes = require("./routes/authRoute");
const adminRoute = require("./routes/adminRoute");

app.use("/", routes);
app.use("/auth/", authRoutes)
app.use("/admin/", adminRoute)
app.use((req, res, next) => {
  res.status(404).render("views/404", {
    title: "404",
  });
});

const port = process.env.PORT || 3000;
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    if (!result) throw new Error("Error in DB result");
    return app.listen(port, () => console.log("Server is running"))
  })
  .catch((err) => {
    throw new Error("Can't connect to DB");
  });
