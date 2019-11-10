const express = require("express");
const app = express();

const server = require('http').Server(app);
const io = require("socket.io")(server);

server.listen(process.env.PORT || 8080);

app.get("/", (req, res) => {
  res.json({
    "message": "hello there"
  })
})