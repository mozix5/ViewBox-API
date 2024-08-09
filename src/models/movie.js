const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema({
  movieId: {
    type: String,
    required: true,
    unique: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  genre: [
    {
      type: String,
      required: true,
    },
  ],
});
module.exports = mongoose.model("Movie", MovieSchema);
