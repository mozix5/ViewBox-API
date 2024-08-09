const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const genreSchema = new Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
  },
  { _id: false }
);

const MovieSchema = new Schema({
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
  genre: [genreSchema],
});
module.exports = mongoose.model("Movie", MovieSchema);
