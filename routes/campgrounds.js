const express = require("express");
const router = express.Router();
const catchAsync = require("../helper/catchAsync");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { isLoggedIn, validateCampground, isAuthor } = require("../middleware");

//multers
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

//controllers
const campgrounds = require("../controllers/campgrounds");

const Campground = require("../models/campground");

router
  .route("/")
  .get(catchAsync(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.createNewCamp)
  );

//create new campgrounds
router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  .get(catchAsync(campgrounds.showCamp))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.updateCamp)
  )
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCamp));

//editing the existing campgrounds
router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.editCamp));

module.exports = router;
