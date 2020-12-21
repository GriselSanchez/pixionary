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

  const nextTurnHandler = () => {
    const playerDrawing = game.nextTurn();
    const nextWord = game.getCurrentWord();

    io.sockets.emit("next-turn", {
      playerDrawing,
      nextWord,
    });

    console.log(`Current player drawing ${playerDrawing.id}`);
  };

  const player = new Player(socket.id);
  game.addPlayer(player);

  socket.on("join", (name) => {
    player.setName(name);
  });

  socket.on("next-turn", nextTurnHandler);

  socket.on("draw", (data) => {
    socket.broadcast.emit("draw", data);
  });

  socket.on("chat", ({ text, name }) => {
    const currentWord = game.getCurrentWord();
    const hasWon = text === currentWord;

    if (hasWon) {
      nextTurnHandler();
      io.sockets.emit("chat", { text: "Player won", name });
    } else io.sockets.emit("chat", { text, name });
  });

  socket.on("disconnect", () => {
    game.removePlayer(socket.id);

    console.log(`Player ${socket.id} disconnected`);
  });
});
