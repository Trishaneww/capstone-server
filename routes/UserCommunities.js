const express = require('express');
const knex = require("knex")(require("../knexfile"));
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = await knex.insert(req.body).into("user_communities");

    const newCommunity = data[0];
    const createdFlashcard = await knex("user_communities").where({
      id: newCommunity,
    });

    console.log(createdFlashcard);

  } catch (err) {
    res.status(400).send(`Error retrieving flashcards: ${err}`);
  }
});


router.get("/:id", async (req, res) => {
  try {
    const data = await knex("user_communities")
    .where({'community_id':req.params.id});
    console.log(data);
    res.send(data)

  } catch (err) {
    res.status(400).send(`Error retrieving flashcards: ${err}`);
  }
});

module.exports = router