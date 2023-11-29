const express = require('express');
const knex = require("knex")(require("../knexfile"));
const router = express.Router();

router.get("/:id", async (req, res) => {
    const id = req.params.id
    try {
      const data = await knex("comments").where({'community_id':id})
      console.log(data)
      res.status(200).send(data);
    } catch (err) {
      console.log(err)
      res.status(400).send(`Error retrieving flashcards: ${err}`);
    }
});

router.post("/", async (req, res) => {
    console.log(req.body)
    try {
      const data = await knex.insert(req.body).into("comments");
  
      const newCommunity = data[0];
      const createdFlashcard = await knex("comments").where({
        id: newCommunity,
      });
  
      console.log(createdFlashcard);
  
    } catch (err) {
      console.log(err)
      res.status(400).send(`Error retrieving flashcards: ${err}`);
    }
  });

module.exports = router