const mongoose = require("mongoose");

const ShowSchema = mongoose.Schema(
  {
    showId: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
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
    genre: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Show", ShowSchema);
