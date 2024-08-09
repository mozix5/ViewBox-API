const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    watchList: [
      {
        movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
