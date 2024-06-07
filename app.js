const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

// const { result } = require("lodash");
const blogRouter = require("./routes/blogRoutes");

const app = express();
const dbURI =
  "mongodb+srv://ninja:ninja123@nodetuts.n9z2aaq.mongodb.net/nodetuts?retryWrites=true&w=majority&appName=nodetuts";
mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("connected to db");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
//register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// redirects

// blog routes

app.use('/blogs',blogRouter);

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
