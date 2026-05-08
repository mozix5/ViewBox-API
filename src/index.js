require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/UserRoutes");
const movieRouter = require("./routes/MovieRoutes");
const reviewRouter = require("./routes/ReviewRoutes");
const proxyRouter = require("./routes/ProxyRoutes");
const cors = require("cors");

const app = express();

// Database connection logic for serverless
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// Connect to DB for each request (handled by mongoose state check)
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use("/users", userRouter);
app.use("/movies", movieRouter);
app.use("/reviews", reviewRouter);
app.use("/proxy", proxyRouter);

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}

module.exports = app;
