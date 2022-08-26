const mongoose = require("mongoose")
const { Schema, model } = mongoose

const EmployeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  salary: { type: Number, required: true, default: 2000 },
  projects: [ { type: mongoose.Types.ObjectId, ref: "Project" } ]
})

const Employee = model("Employee", EmployeeSchema)

module.exports = Employee
