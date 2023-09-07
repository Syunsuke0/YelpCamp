const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressEroor");
const methodOverride = require("method-override");
const campgroundRoutes = require("./routes/campgrounds");
const reviewRoutes = require("./routes/reviews");

mongoose
  .connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDBコネクションOK!!!");
  })
  .catch((err) => {
    console.log("MongoDBコネクションエラー!!!");
    console.log(err);
  });

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);

app.all("*", (req, res, next) => {
  next(new ExpressError("ページが見つかりませんでした", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (!err.message) {
    err.message = "問題が起きました";
  }
  res.status(statusCode).render("error", { err });
});

app.listen(3000, (req, res) => {
  console.log("ポート3000で待受中...");
});
