const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/UserRoutes");
const movieRouter = require("./routes/MovieRoutes");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/movies", movieRouter);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server started on port " + PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
