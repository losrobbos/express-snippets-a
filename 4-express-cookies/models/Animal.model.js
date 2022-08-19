const mongoose = require("mongoose")
const { Schema, model } = mongoose

const AnimalSchema = new Schema({
  name: { type: String, required: true },
  age: Number // optional
}, {
  versionKey: false,
  timestamps: true
})

const Animal = model("Animal", AnimalSchema, "animals")
// mongoose: Model name Animal => looks up collection: animals 

module.exports = Animal