const express = require("express");
const httpServer = require("http").createServer(express);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
  },
});

const port = process.env.PORT || 4000;

io.on("connection", (socket) => {
  console.log("A user is cinnected");

  socket.on("message", (message) => {
    console.log(message);
    io.emit("message", `${socket.id.substr(0, 2)} said ${message}`);
  });
  socket.on("disconnect", () => {
    console.log("a user is disconnected!");
  });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));
