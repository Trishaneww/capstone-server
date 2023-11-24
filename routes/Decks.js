const express = require('express');
const knex = require("knex")(require("../knexfile"));
const router = express.Router();

router.get("/", async (req, res) => {
    try {
      const data = await knex("decks")
      .join('users', 'users.id', 'decks.user_id')
      .select('decks .*', 'users.username')
      .where({status: "public"})

      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(`Error retrieving flashcards: ${err}`);
    }
});

router.get("/user/:id", async (req, res) => {
  try {
    const data = await knex("decks")
    .where({'user_id':req.params.id})

    res.status(200).send(data);
    console.log(req.params.id)
    console.log(data)
  } catch (err) {
    console.log("no match")
    res.status(400).send(`Error retrieving flashcards: ${err}`);
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const data = await knex("decks")
    .join('users', 'users.id', 'decks.user_id')
    .select('decks .*', 'users.username')
    .where({'title':req.params.id, 'status':'public'})

    res.status(200).send(data);
    console.log(req.params.id)
    console.log(data)
  } catch (err) {
    console.log("no match")
    res.status(400).send(`Error retrieving flashcards: ${err}`);
  }
});

router.get("/:id", async (req, res) => {
    try {
      const data = await knex("decks")
      .join('users', 'users.id', 'decks.user_id')
      .select('decks .*', 'users.username')
      .where({'decks.id': req.params.id})

      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(`Error retrieving flashcards: ${err}`);
    }
});

router.post("/", async (req, res) => {
    try {
      const data = await knex.insert(req.body).into("decks");
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

router.delete("/:id", async (req, res) => {
    try {
      const deckDelete = await knex("decks")
        .where({ id: req.params.id })
        .delete();
  
      if (deckDelete === 0) {
        return res
          .status(404)
          .json({ message: `Warehouse with ID ${req.params.id} not found` });
      }
  
      // No Content response
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({
        message: `Unable to delete warehouse: ${error}`,
      });
    }
  });

module.exports = router