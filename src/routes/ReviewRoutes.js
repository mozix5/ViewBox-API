const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const { addReview, getReviews } = require("../controllers/reviewController");
const reviewRouter = express.Router();

reviewRouter.get("/:movieId", getReviews);
reviewRouter.post("/", verifyToken, addReview);

module.exports = reviewRouter;
