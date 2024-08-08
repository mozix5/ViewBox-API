const showModel = require("../models/show");
const userModel = require("../models/user");

const createShow = async (req, res) => {
  const { showId, userId, title, rating, genre, posterUrl } = req.body;
  const newShow = await new showModel({
    user: userId,
    showId,
    posterUrl,
    genre,
    title,
    rating,
  });
  try {
    await newShow.save();
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    user.watchList.push(newShow);
    await user.save();
    
    res.status(201).json({ message: "Movie added to watchlist", newShow });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
const deleteShow = async (req, res) => {
  const id = req.params.id;
  try {
    const show = await showModel.findByIdAndRemove(id);
    res.status(202).json(show);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
const getShow = async (req, res) => {
  const { userId } = req.params;
  const { page = 1, limit = 10 } = req.query;
  try {
    const user = await userModel.findById(userId).populate({
      path: "watchList",
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

const isShowInCollection = async (req, res) => {
  const { userId, showId } = req.params;
  try {
    const isShowPresent = await showModel.findOne({
      userId: userId,
      showId: showId,
    });
    if (isShowPresent) {
      res.status(200).json({ isShowPresent: true });
    } else {
      res.status(200).json({ isShowPresent: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { createShow, deleteShow, getShow, isShowInCollection };
