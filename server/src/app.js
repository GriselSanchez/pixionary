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
  console.log(`Player ${socket.id} connected`);

  const player = new Player(socket.id);
  game.addPlayer(player);

  socket.on("join", (name) => {
    player.setName(name);
  });

  socket.on("next-turn", () => {
    const playerDrawing = game.nextTurn();

    io.sockets.emit("next-turn", {
      playerDrawing,
    });

    console.log(`Current player drawing ${playerDrawing.name}`);
  });

  socket.on("draw", (data) => {
    socket.broadcast.emit("draw", data);
  });

  socket.on("chat", (data) => {
    io.sockets.emit("chat", { text: data.text, name: data.name });
  });

  socket.on("disconnect", () => {
    game.removePlayer(socket.id);

    console.log(`Player ${socket.id} disconnected`);
  });
});
