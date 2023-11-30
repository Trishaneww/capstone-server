const express = require('express');
const knex = require("knex")(require("../knexfile"));
const router = express.Router();

router.get("/:id", async (req, res) => {
    const id = req.params.id
    try {
      const data = await knex("comments").where({'community_id':id})
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(`Error retrieving flashcards: ${err}`);
    }
});

router.post("/", async (req, res) => {
    try {
      const data = await knex.insert(req.body).into("comments");
  
      const newCommunity = data[0];
      const createdFlashcard = await knex("comments").where({
        id: newCommunity,
      });

  
    } catch (err) {
      res.status(400).send(`Error retrieving flashcards: ${err}`);
    }
  });

module.exports = router