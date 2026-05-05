const Review = require("../models/review");

const addReview = async (req, res) => {
  const { movieId, rating, reviewText } = req.body;
  const userId = req.userId;

  try {
    const review = await Review.create({
      movieId,
      user: userId,
      rating,
      reviewText,
    });
    
    const populatedReview = await Review.findById(review._id).populate("user", "username");

    res.status(201).json(populatedReview);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getReviews = async (req, res) => {
  const { movieId } = req.params;

  try {
    const reviews = await Review.find({ movieId }).populate("user", "username").sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const toggleLike = async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.userId;

  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    const isLiked = review.likes.includes(userId);

    if (isLiked) {
      review.likes = review.likes.filter((id) => id.toString() !== userId.toString());
    } else {
      review.likes.push(userId);
    }

    await review.save();
    res.status(200).json(review);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { addReview, getReviews, toggleLike };
