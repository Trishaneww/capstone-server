const express = require('express');
const router = express.Router();
const cookieParser = require("cookie-parser")
const bcrypt = require('bcryptjs');
const knex = require("knex")(require("../knexfile"));
const jwt = require('jsonwebtoken');
const authorize = require('../middlewares/auth')


router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send("Please enter the required fields.");
  }
  const hashedPassword = bcrypt.hashSync(password);
  const newUser = {
    username,
    email,
    password: password
  };
  // Insert it into our database
  try {
    const user = await knex('users').insert(newUser);
    const newUserId = user[0]
    const newuser = await knex("users")
      .where({id: newUserId,});
    console.log(newuser)
    const favouriteDeck = {
      user_id: newUserId,
      title: 'Favourite',
      description: 'Favourites deck',
      isFavourite: true,
      faculty: 'none',
      coursecode: 'none',
      school: 'none',
      status: 'hidden'
    }
      const newdeck = await knex.insert(favouriteDeck).into("decks");
      const newDeckId = newdeck[0];
      const createdDeck = await knex("decks").where({
        id: newDeckId,
      });

      console.log(createdDeck);

    res.status(201).send("Registered successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send("Failed registration");
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Please enter the required fields");
  }

  // Find the user
  const user = await knex('users').where({ email: email });
  if (!user) {
    console.log(user)
    console.log("invalid email")
    return res.status(400).send("Invalid email");
  } else {
    console.log(user)

    if (password === user[0].password) {
      console.log("SUCCESS")
    } else {
        console.log("invalid password")
        return res.status(400).send("Invalid password");
    }
  }

  // Generate a token
  const token = jwt.sign(
    { id: user[0].id, email: user[0].email },
    process.env.JWT_SECRET,
    { expiresIn: "50m" } // realistically keep it to a couple of hours, ie: "8h"
  )

  // Send the token as a response
  res.status(200).json({ token: token });
})

// GET /current : Requires Auth (using auth middleware)
router.get(
  '/current',
  authorize,
  async (req, res) => {
    // Get the user
    try {
      // Respond with the appropriate user data
      const user = await knex('users').where({ id: req.token.id }).first();
      // Don't send the password value to the client
      delete user.password;
      res.json(user);
    } catch (error) {

    }
  }
)

// GET /current/no-mid : Requires Auth (no middleware, auth validation directly)
router.get('/current/no-mid', async (req, res) => {
  // If there is no auth header provided
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }
  
  // Parse the bearer token
  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(' ')[1];
  
  // Verify the token
  // Verify the token
  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

    console.log('Decoded: ', decoded);

    // Respond with the appropriate user data
    const user = await knex('users').where({ id: decoded.id }).first();
    // Don't send the password value to the client
    delete user.password;
    res.json(user);
  } catch (error) {
      return res.status(401).send("Invalid auth token");
  }
})


module.exports = router