const express = require('express');
const knex = require("knex")(require("../knexfile"));
const jwt = require('jsonwebtoken')
const router = express.Router();
maxAge = 3*24*60*60;

const createToken = (id) => {
    return jwt.sign({id}, "secretkey", {
        expiresIn: maxAge
    })
}

router.post('/register', async (req, res, next) => {
    try {
        const createUser = await knex.insert(req.body).into("users")
        const newUserId = createUser[0];
        const token = createToken(newUserId)
        const user = await knex("users").where({
            id: newUserId,
        });
        console.log(user)
        console.log(token)
        res.cookie("jwt", token, {
            withCrdentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
        })
    } catch (err) {
        console.log(err)
    }
    next()
})


router.get("/", async (req, res) => {
    try {
      const data = await knex("users");
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(`Error retrieving users: ${err}`);
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
module.exports = router