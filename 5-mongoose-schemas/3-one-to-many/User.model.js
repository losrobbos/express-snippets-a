const mongoose = require("mongoose")
const { Schema, model } = mongoose

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  todos: [ { type: Schema.Types.ObjectId, ref: "Todo" } ]
})

const User = model("User", UserSchema)

module.exports = User
