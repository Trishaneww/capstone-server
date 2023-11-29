const express = require('express');
const knex = require("knex")(require("../knexfile"));
const router = express.Router();

router.get("/", async (req, res) => {
    try {
      const data = await knex("communities")

      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(`Error retrieving flashcards: ${err}`);
    }
});

router.get("/:id", async (req, res) => {
  try {
    const community = await knex('communities').where({'id':req.params.id})
    res.status(200).send(community);
  } catch (err) {
    res.status(400).send(`Error retrieving flashcards: ${err}`);
  }
});


router.get("/user/:id", async (req, res) => {
    console.log(req.params.id)
    try {
        const usergroups = await knex('communities').whereIn('id',
        knex('user_communities').select('community_id').where({'user_id':req.params.id})
     )
     
      res.status(200).send(usergroups);
    } catch (err) {
      res.status(400).send(`Error retrieving flashcards: ${err}`);
    }
});

router.get("/find/:id1/:id2", async (req, res) => {
  console.log(`course ${req.params.id1}`)
  const school = req.params.id2.split("-").join(" ")
  console.log(school)
  try {
    const data = await knex("decks")
    .where({'coursecode':req.params.id1, 'school':school})
    res.status(200).send(data);
    console.log(data)
  } catch (err) {
    console.log("no match")
    res.status(400).send(`Error retrieving flashcards: ${err}`);
  }
});


router.post("/:id", async (req, res) => {
  try {
    const data = await knex.insert(req.body).into("communities");
    const newHiveId = data[0];
    const createdDeck = await knex("communities").where({
      id: newHiveId,
    });

    const userhive = {
      user_id: req.params.id,
      community_id: newHiveId
    }

    const userHive = await knex.insert(userhive).into("user_communities");
    const newCommunity = userHive[0];
    const newUserHive = await knex("user_communities").where({
      id: newCommunity,
    });

    console.log(newUserHive);

  } catch (err) {
    res
      .status(500)
      .send({ message: `Unable to create new deck: ${err}` });
      console.log({ message: `Unable to create new deck: ${err}` });
  }
});




module.exports = router