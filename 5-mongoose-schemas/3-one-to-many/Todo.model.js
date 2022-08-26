const mongoose = require("mongoose")
const { Schema, model } = mongoose

const TodoSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  user: {
    ref: 'User',
    type: Schema.Types.ObjectId,
    required: true
  },

})

const Todo = model("Todo", TodoSchema)

module.exports = Todo