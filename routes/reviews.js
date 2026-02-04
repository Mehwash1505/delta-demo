// routes/review.js
const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

//Reviews

//POST route
router.post("/", isLoggedIn, validateReview, wrapAsync (reviewController.createReview));

//Delete Review Route
router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
     wrapAsync (reviewController.deleteReview)
);

module.exports = router;

// app.use((err, req, res, next) => {
//     let { statusCode = 500,  message = "Something went wrong!" } = err;
//     res.status(statusCode).render("error.ejs", { message });
// });
