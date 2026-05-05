const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const { addReview, getReviews, toggleLike } = require("../controllers/reviewController");
const reviewRouter = express.Router();

reviewRouter.get("/:movieId", getReviews);
reviewRouter.post("/", verifyToken, addReview);
reviewRouter.post("/like/:reviewId", verifyToken, toggleLike);

module.exports = reviewRouter;
