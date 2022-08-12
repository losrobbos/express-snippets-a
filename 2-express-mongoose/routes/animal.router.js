const { Router } = require("express");
const Animal = require("../models/Animal.model");

const animals = [
  { _id: "a1", name: "Toxic Penguin" },
  { _id: "a2", name: "Crazy Koala" },
  { _id: "a3", name: "Sweet Birdy" },
];

const animalRouter = Router();

// GET ALL animals
animalRouter.get("/", async (req, res, next) => {
  const animals = await Animal.find();
  res.send(animals);
});

// CREATE new animal
animalRouter.post("/", async (req, res, next) => {
  try {
    const animalNew = await Animal.create(req.body);
    res.send(animalNew);
  } catch (err) {
    res.status(400).send({
      error: err.message,
    });
  }
});

// PATCH ? => UPDATE some properties only
// PUT ? => REPLACE ALL

animalRouter.patch("/:id", async (req, res, next) => {
  const { id } = req.params;

  // update record in DB
  try {
    const animalUpdated = await Animal.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send(animalUpdated);
  } catch (err) {
    res.status(400).send({
      error: err.message,
    });
  }
});

animalRouter.delete("/:id", async (req, res, next) => {
  try {
    const animalDeleted = await Animal.findByIdAndDelete(req.params.id);
    res.send(animalDeleted);
  } catch (err) {
    res.status(400).send({
      error: err.message,
    });
  }
});

module.exports = animalRouter;

// module.exports => export default
// exports.name => export const name
