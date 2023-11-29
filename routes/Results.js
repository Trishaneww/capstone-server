const express = require('express');
const knex = require("knex")(require("../knexfile"));
const router = express.Router();

router.get("/:id", async (req, res) => {
    const id = req.params.id
    try {
      const data = await knex("results").where({'user_id':id})
      console.log(data)
      res.status(200).send(data);
    } catch (err) {
      console.log(err)
      res.status(400).send(`Error retrieving flashcards: ${err}`);
    }
});

router.post("/", async (req, res) => {
  try {
    const data = await knex.insert(req.body).into("results");
    const newDeckId = data[0];
    const createdDeck = await knex("decks").where({
      id: newDeckId,
    });
    console.log(createdDeck);
  } catch (err) {
    res
      .status(500)
      .send({ message: `Unable to create new deck: ${err}` });
      console.log({ message: `Unable to create new deck: ${err}` });
  }
});

module.exports = router