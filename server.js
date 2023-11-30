const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const authorize = require('./middlewares/auth')
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io")
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
const communitiesRoute = require('./routes/Communities')
const commentsRoute = require('./routes/Comments')
const userCommunitiesRoute = require('./routes/UserCommunities')
const authRoute = require('./routes/Auth')
const resultsRoute = require('./routes/Results')


app.use("/", authRoute)
app.use("/users", userRoute)
app.use("/deck", deckRoute)
app.use("/results", resultsRoute)
app.use('/flashcard', flashcardRoute)
app.use("/communities", communitiesRoute)
app.use("/comments", commentsRoute)
app.use("/usercommunities", userCommunitiesRoute)

app.get("/", (req, res) => {
  res.send("DEFAULT");
});


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
      origin: "http://localhost:3000",
  }
})

io.on("connection", (socket) => {
    console.log(`user connected ${socket.id}`)

    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`User with ID ${socket.id} joined room ${data}`)
    })

  //   socket.on("user_count", (data) => {
  //      socket.join(data)
  //      cc
  //      console.log(`User with ID ${socket.id} joined room ${data}`)
  //  })

   socket.on("count", (data) => {
    const room = data.room
       const userCount = data.count + 1
       const count = {
        room:room,
        users: userCount
       }
       console.log(count)
    socket.to(data.room).emit("user_count", data)
    console.log(data)
   })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data)
        console.log(data)
    })

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id)
    })
})

server.listen(3002, () => {
    console.log("SERVER RUNNING")
})


app.listen(1666, () => {
    console.log(`running at http://localhost:1666`);
});