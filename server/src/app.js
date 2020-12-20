const http = require("http");
const express = require("express");
const cors = require("cors");

const Game = require("./game");
const Player = require("./player");

const PORT = "8000";

const game = new Game();
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.set("port", PORT);
app.use(cors());

server.on("listening", () => {
  console.log(`Listening on port ${PORT}`);
});

server.listen(PORT);

io.sockets.on("connection", (socket) => {
  const client = new Player(socket.id, false);

  game.addPlayer(client);

  socket.on("next-turn", () => {
    game.nextTurn();
  });

  socket.on("draw", (data) => {
    socket.broadcast.emit("draw", data);
  });

  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  socket.on("disconnect", () => console.log("Client has disconnected"));
});
