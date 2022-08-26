const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const JWT_SECRET = process.env.JWT_SECRET;
const { Router } = require('express')
const authRouter = Router()

authRouter.post("/signup", async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // GET user from "database" (fake)
  // const user = { _id: "r123", name: "Rob" }
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      error: "Wrong login data",
    });
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(400).json({
      error: "Wrong login data",
    });
  }

  // Create token from user data
  const tokenData = { _id: user._id, email: user.email };
  const token = jwt.sign(tokenData, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });

  res.send({
    token,
  });
});

module.exports = authRouter