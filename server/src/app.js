const http = require("http");
const express = require("express");
const cors = require("cors");
var fs = require("fs");

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

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

app.use("/word", (req, res) => {
  try {
    const data = fs.readFileSync("src/words.json");
    const words = JSON.parse(data);

    const category = req.query.category || "medium";
    const wordsFromCategory = words[category];
    const randomWordIndex = getRandomInt(0, wordsFromCategory.length - 1);

    res.send({ word: wordsFromCategory[randomWordIndex] });
  } catch (e) {
    console.log("Error:", e.stack);
  }
});

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

    console.log(`Current player drawing ${playerDrawing.id}`);
  });

  socket.on("draw", (data) => {
    socket.broadcast.emit("draw", data);
  });

  socket.on("chat", ({ text, name }) => {
    io.sockets.emit("chat", { text, name });
  });

  socket.on("disconnect", () => {
    game.removePlayer(socket.id);

    console.log(`Player ${socket.id} disconnected`);
  });
});
