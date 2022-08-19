const express = require('express')
const User = require('../models/User.model')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

const userRouter = express.Router()

const JWT_SECRET = process.env.JWT_SECRET;


userRouter.get("/", async (req, res) => {
  try {
    const users = await User.find()
    res.json( users )
  }
  catch(err) {
    next(err)
  }
})

userRouter.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById( req.params.id )
    res.json( user )
  }
  catch(err) {
    next(err)
  }
})

// USER Login
// sends email, password
userRouter.post("/login", async (req, res) => {
  
  const { email, password: pwPlain } = req.body

  const userFound = await User.findOne({ email })

  if(!userFound) {
    return res.status(400).json({
      error: "Credentials dont match"
    })
  }

  // is password correct?
  const pwMatches = bcrypt.compareSync(pwPlain, userFound.password)

  if(!pwMatches) {
    return res.status(400).json({
      error: "Credentials dont match",
    });
  }

  // klappt! user is logged in!
  const token = jwt.sign({ _id: userFound._id, email: userFound.email }, JWT_SECRET);

  // put token into a cookie
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 10 * 60 * 60 * 1000, // 2 hours
  });

  res.send(userFound); // BODY
});



// SIGNUP new user
userRouter.post("/", async (req, res, next) => {

  const { password } = req.body

  // replace plain text password with hashed password before storing
  req.body.password = bcrypt.hashSync(password, 10);

  try {
    const userNew = await User.create( req.body  )
    res.json( userNew )
  }
  catch(err) {
    next(err)
  }
})

userRouter.patch("/:id", async (req, res, next) => {
  try {
    const userUpdated = await User.findByIdAndUpdate( req.params.id, req.body, { new: true } )
    res.json( userUpdated )
  }
  catch(err) {
    next(err)
  }
})

userRouter.delete("/:id", async (req, res, next) => {
  try {
    const userDeleted = await User.findByIdAndDelete( req.params.id )
    res.json( userDeleted )
  }
  catch(err) {
    next(err)
  }
})

module.exports = userRouter