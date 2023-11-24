const express = require('express');
const knex = require("knex")(require("../knexfile"))
const router = express.Router();

router.get("/", async (req, res) => {
    try {
      const data = await knex("users");
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(`Error retrieving users: ${err}`);
    }
});

module.exports = router