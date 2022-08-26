import mongoose from "mongoose"
const { Schema, model } = mongoose

const UserSchema = new Schema({
  name: { type: String, required: true },
  avatar: { type: String } // optional
})

const User = model("User", UserSchema)

export default User
