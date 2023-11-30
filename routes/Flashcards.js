const express = require('express');
const knex = require("knex")(require("../knexfile"));
const router = express.Router();
const axios = require('axios')


router.get("/:id", async (req, res) => {
    try {
      const data = await knex("flashcards")
        .where({ deck_id: req.params.id });

    res.send(data)

    } catch (error) {
      res.send(error)
    }
});


router.get("/", async (req, res) => {
    try {
      const data = await knex("flashcards");
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(`Error retrieving flashcards: ${err}`);
    }
});

router.post("/favourite/:id", async (req, res) => {
  const {question, answer} = req.body
  const deck = await knex('decks')
    .where({isFavourite: 1, user_id: req.params.id})
    console.log(deck[0].id)

    const newFlashcard = {
      deck_id:deck[0].id,
      question: question,
      answer: answer,
    };
    
  try {
    const data = await knex.insert(newFlashcard).into("flashcards");
    const newFlashcardId = data[0];
    const createdFlashcard = await knex("flashcards").where({
      id: newFlashcardId,
    });

    console.log(createdFlashcard);

    try {
      const user = await knex('users')
      .where({id: 1})
      .update({activity: 1})
      if (user) {
        const updatedUser = await knex("users").where({ id: user });
        console.log(updatedUser)
        res.status(200).json(updatedUser);
      } else {
        console.log("doesnt exist")
      }
    } catch (Err) {
      console.log(Err)
    }

  } catch (err) {
    res
      .status(500)
      .send({ message: `Unable to create new deck: ${err}` });
      console.log({ message: `Unable to create new deck: ${err}` });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await knex.insert(req.body).into("flashcards");
    const newFlashcardId = data[0];
    const createdFlashcard = await knex("flashcards").where({
      id: newFlashcardId,
    });

    console.log(createdFlashcard);

    try {
      const user = await knex('users')
      .where({id: 1})
      .update({activity: 1})
      if (user) {
        const updatedUser = await knex("users").where({ id: user });
        console.log(updatedUser)
        res.status(200).json(updatedUser);
      } else {
        console.log("doesnt exist")
      }
    } catch (Err) {
      console.log(Err)
    }

  } catch (err) {
    res
      .status(500)
      .send({ message: `Unable to create new deck: ${err}` });
      console.log({ message: `Unable to create new deck: ${err}` });
  }
});

router.put("/:id", async (req, res) => {
  const updates = req.body;
  console.log(updates)

  try {
    const number = await knex("flashcards")
      .where({ id: req.params.id })
      .update(updates);

    if (number) {
      const updatedwarehouse = await knex("flashcards").where({ id: number });
      res.status(200).json(updatedwarehouse);
    } else {
      console.log("error updating ");
      res
        .status(404)
        .json({ message: `Warehouse ID: ${req.params.id} doesn't exist` });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating new warehouse", error: err });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deckDelete = await knex("flashcards")
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