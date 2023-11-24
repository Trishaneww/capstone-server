const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const bcrypt = require('bcryptjs');
const knex = require("knex")(require("./knexfile"));
const jwt = require('jsonwebtoken');
const authorize = require('./middlewares/auth')
const cors = require("cors");
app.use(cors
  ({origin:'http://localhost:3000', 
    credentials:true,            
    optionSuccessStatus:200
  }));

require("dotenv").config();
app.use(cookieParser())
app.use(express.json());



const userRoute = require('./routes/Users')
const deckRoute = require('./routes/Decks')
const flashcardRoute = require('./routes/Flashcards')
const authRoute = require('./routes/Auth')
app.use("/", authRoute)
app.use("/users", userRoute)
app.use("/deck", deckRoute)
app.use('/flashcard', flashcardRoute)



app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send("Please enter the required fields.");
  }

  const hashedPassword = bcrypt.hashSync(password);

  console.log('Naked: ', password);
  console.log('Hashed: ', hashedPassword);

  // Create the new user
  const newUser = {
    username,
    email,
    password: hashedPassword
  };

  // Insert it into our database
  try {
    await knex('users').insert(newUser);
    res.status(201).send("Registered successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send("Failed registration");
  }
});

// POST /login
// -   Generates and responds a JWT for the user to use for future authorization.
// -   Expected body: { email, password }
// -   Response format: { token: "JWT_TOKEN_HERE" }
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Please enter the required fields");
  }

  // Find the user
  const user = await knex('users').where({ email: email });
  if (!user) {
    console.log("invalid email")
    return res.status(400).send("Invalid email");
  } else {
    console.log(user)
    console.log(user[0].password)
  }

  if (password === user[0].password) {
    console.log("SUCCESS")
  } else {
      console.log("invalid password")
      return res.status(400).send("Invalid password");
  }

  // Generate a token
  const token = jwt.sign(
    { id: user[0].id, email: user[0].email },
    process.env.JWT_SECRET,
    { expiresIn: "20m" } // realistically keep it to a couple of hours, ie: "8h"
  )

  // Send the token as a response
  res.status(200).json({ token: token });
})

// GET /current : Requires Auth (using auth middleware)
app.get(
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
app.get('/current/no-mid', async (req, res) => {
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


app.get("/", (req, res) => {
  res.send("DEFAULT");
});







app.listen(1666, () => {
    console.log(`running at http://localhost:1666`);
  });