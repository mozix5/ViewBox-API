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

module.exports = { addReview, getReviews };
