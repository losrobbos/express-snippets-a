const { Router } = require("express")

const animals = [
  { _id: "a1", name: "Toxic Penguin" },
  { _id: "a2", name: "Crazy Koala" },
  { _id: "a3", name: "Sweet Birdy" },
]

const animalRouter = Router()

// GET ALL animals
animalRouter.get("/", (req, res, next) => {
  res.send(animals)
})

// CREATE new animal
animalRouter.post("/", (req, res, next) => {
  console.log("Body: ", req.body)
  const animalNew = req.body
  animals.push(animalNew)
  res.send( animalNew )
})

module.exports = animalRouter

// module.exports => export default
// exports.name => export const name