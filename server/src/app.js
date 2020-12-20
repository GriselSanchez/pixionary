const http = require("http");
const express = require("express");
const cors = require("cors");

const PORT = "8000";

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
  console.log("Client connected: " + socket.id);

  // socket.broadcast.emit will send the message to all the other clients except the newly created connection
  socket.on("mouse", (data) => {
    socket.broadcast.emit("mouse", data);
  });
  socket.on("disconnect", () => console.log("Client has disconnected"));
});
