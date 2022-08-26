const mongoose = require("mongoose")
const { Schema, model } = mongoose

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  employees: [ { type: mongoose.Types.ObjectId, ref: "Employee" } ] // store IDs of employee here
})

const Project = model("Project", ProjectSchema)

module.exports = Project