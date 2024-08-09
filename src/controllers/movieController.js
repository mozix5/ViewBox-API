const movieModel = require("../models/movie");
const userModel = require("../models/user");

const addToWatchList = async (req, res) => {
  const { movieId, userId, title, rating, genre, posterUrl } = req.body;
  try {
    let movie = await movieModel.findOne({ movieId });
    if (!movie) {
      movie = new movieModel({
        movieId,
        posterUrl,
        genre,
        title,
        rating,
      });
      await movie.save();
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMovieInWatchList = user.watchList.some((item) =>
      item.movie.equals(movie._id)
    );
    if (isMovieInWatchList) {
      return res.status(400).json({ message: "Movie already in watchlist" });
    }

    user.watchList.push({ movie: movie._id });
    await user.save();

    res.status(201).json({ message: "Movie added to watchlist", movie });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteMovie = async (req, res) => {
  const { userId, movieId } = req.params;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const movie = await movieModel.findOne({ movieId });
    if (!movie) {
      return res.status(404).json({ message: "movie not found" });
    }

    const isMovieInWatchList = user.watchList.some((item) =>
      item.movie.equals(movie._id)
    );
    if (!isMovieInWatchList) {
      return res.status(404).json({ message: "movie not found" });
    }

    await userModel.updateOne(
      { _id: userId },
      {
        $pull: { watchList: { movie: movie._id } },
      }
    );
    return res.status(202).json({ message: "movie removed from watchlist" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

const getWatchList = async (req, res) => {
  const { userId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  try {
    const user = await userModel.findById(userId).populate({
      path: "watchList.movie",
      options: {
        skip: (page - 1) * limit,
        limit: limit,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json(user.watchList);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const isMovieInCollection = async (req, res) => {
  const { userId, movieId } = req.params;
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const movie = await movieModel.findOne({ movieId });
    if (!movie) {
      return res.status(200).json({ isMovieInWatchList: false });
    }

    const isMovieInWatchList = user.watchList.some((item) =>
      item.movie.equals(movie._id)
    );
    if (isMovieInWatchList) {
      res.status(200).json({ isMovieInWatchList: true });
    } else {
      return res.status(200).json({ isMovieInWatchList: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  addToWatchList,
  deleteMovie,
  getWatchList,
  isMovieInCollection,
};
