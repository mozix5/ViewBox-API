const express = require("express");
const verifyToken = require("../middlewares/verifyToken");
const {
  createShow,
  deleteShow,
  getShow,
  isShowInCollection,
} = require("../controllers/showController");
const showRouter = express.Router();

showRouter.get("/:userId", verifyToken, getShow);
showRouter.get("/:userId/:showId", verifyToken, isShowInCollection);
showRouter.post("/", verifyToken, createShow);
showRouter.delete("/:id", verifyToken, deleteShow);

module.exports = showRouter;
