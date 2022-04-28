const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review");
const Campground = require("../models/campground");
//async/error handlers
const catchAsync = require("../helper/catchAsync");
const ExpressError = require("../helper/ExpressError");

const reviews = require("../controllers/reviews");

const Joi = require("joi");
const { campgroundSchema, reviewSchema } = require("../schemas.js");
const {
  isLoggedIn,
  validateCampground,
  isAuthor,
  validateReview,
  isReviewAuthor,
} = require("../middleware");

//nesting to make relation between campgrounds into review data
router.post("/", validateReview, isLoggedIn, catchAsync(reviews.createReview));
//Delete Reviews
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

module.exports = router;
