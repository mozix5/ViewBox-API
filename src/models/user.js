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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Show",
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
