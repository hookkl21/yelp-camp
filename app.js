if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//importing
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const methodOverride = require("method-override");
const ExpressError = require("./helper/ExpressError");
//passport
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

//session
const session = require("express-session");
//flash
const flash = require("connect-flash");

const MongoStore = require("connect-mongo");

//validating correct data from user (JOI Schema)
const Joi = require("joi");
const { campgroundSchema, reviewSchema } = require("./schemas.js");

//ejs path set ups
const ejsMate = require("ejs-mate");
const res = require("express/lib/response");
const { join } = require("path");

//routers imports
const campgroundRoutes = require("./routes/campgrounds");
const reviewRoutes = require("./routes/reviews");
const userRoutes = require("./routes/users");

//mongo sanitize for security
const mongoSanitize = require("express-mongo-sanitize");

const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/yelpCamp";

main().catch((err) => {
  console.log("Oh no Mongo Error!");
  console.log(err);
});

async function main() {
  await mongoose.connect(dbUrl);
  console.log("Mongo Connecting!");
}

const app = express();
//getting ejs
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
//to set up the pathway from main dir (YelpCamp) into views dir
app.set("views", path.join(__dirname, "views"));
//requesting body parse
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use(mongoSanitize());

const secret = process.env.SECRET || "thisshouldbeabettersecret";

const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
  crypto: {
    secret,
  },
});

store.on("error", function (e) {
  console.log("Session Store Error", e);
});

//session
const sessionConfig = {
  store,
  name: "session",
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    //secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
//flash
app.use(flash());

//passport use (if using session these must be declared after session config)
app.use(passport.initialize());
app.use(passport.session());
//flash middleware where it displays flash for every request
app.use((req, res, next) => {
  //user Logged in or not changes navbar login/regist or logout
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

//router to restructuring
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);
app.use("/", userRoutes);

passport.use(new LocalStrategy(User.authenticate()));
//storing user info
passport.serializeUser(User.serializeUser());
//taking off user info
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
  res.render("home");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

//Error useless handling for testing catching error
app.use((err, req, res, next) => {
  //console.log(err);
  const { status = 500 } = err;
  if (!err.message) err.message = "Something Went Wrong";
  res.status(status).render("error", { err });
});
const port = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`Listening port ${port}`);
});
