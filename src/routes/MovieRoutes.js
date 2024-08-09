const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const {
  addToWatchList,
  deleteMovie,
  getWatchList,
  isMovieInCollection,
} = require("../controllers/movieController");
const showRouter = express.Router();

showRouter.get("/:userId", verifyToken, getWatchList);
showRouter.get("/:userId/:movieId", verifyToken, isMovieInCollection);
showRouter.post("/", verifyToken, addToWatchList);
showRouter.delete("/:userId/:movieId", verifyToken, deleteMovie);

module.exports = showRouter;
