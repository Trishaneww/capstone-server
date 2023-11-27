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


app.get("/", (req, res) => {
  res.send("DEFAULT");
});



app.listen(1666, () => {
    console.log(`running at http://localhost:1666`);
  });