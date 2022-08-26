import './config.js'
import express from 'express';
import { v2 as cloudinary } from 'cloudinary'
import User from './User.model.js';
import mongoose from 'mongoose';
const app = express();

app.use( express.json({ limit: '200KB' }) ) // parse incoming data into req.body

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// upload file to route
app.post("/user", async (req, res, next) => {

  const { avatar } = req.body
  console.log(avatar.substring(0, 100))

  console.log(process.env.CLOUDINARY_UR);

  try {
    const result = await cloudinary.uploader.upload(avatar)
    const avatarUrl = result.secure_url
    req.body.avatar = avatarUrl

    const userCreated = await User.create(req.body)
    res.json(userCreated)
  }
  catch(err) {
    console.log(err)
    res.json({ error: err.message })
  }

})

mongoose.connect("mongodb://localhost/d04-a-db")
.catch(err => console.log("[ERR]: ", err.message))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});

