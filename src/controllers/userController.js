const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({ message: "user already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await userModel.create({
        username: username,
        password: hashedPassword,
        email: email,
      });

      const token = jwt.sign(
        { email: result.email, id: result._id },
        SECRET_KEY
      );
      res.status(201).json({ user: result, token: token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      res.status(404).json({ message: "user does not exists" });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);
    if (!matchPassword) {
      res.status(400).json({ message: "bad credentials" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY
    );
    res.status(200).json({ user: existingUser, token: token });
  } catch (error) {}
};

module.exports = { signup, signin };
