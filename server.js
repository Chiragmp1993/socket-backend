const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://socket-frontend-alpha.vercel.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.get("/", (req, res) => {
  res.send("Socket Backend Running");
});

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  socket.on("message", (data) => {
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});