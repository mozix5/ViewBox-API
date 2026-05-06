const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const { addReview, getReviews, toggleLike } = require("../controllers/reviewController");
const reviewRouter = express.Router();

reviewRouter.get("/:movieId", getReviews);
reviewRouter.post("/", verifyToken, addReview);
reviewRouter.post("/toggle-like/:reviewId", verifyToken, (req, res, next) => {
  console.log("Like request received for:", req.params.reviewId);
  next();
}, toggleLike);

module.exports = reviewRouter;
