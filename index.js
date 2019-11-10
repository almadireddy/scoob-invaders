const express = require("express");
const app = express();

const server = require('http').Server(app);
const io = require("socket.io")(server);

server.listen(process.env.PORT || 8080);
app.use(express.static('public'));

let leftSide  = {
  connected: false
};

let rightSide = {
  connected: false
};

io.on('connection', socket => {
  console.log("a user connected.");

  socket.on("leftSide", (info) => {
    console.log(info);
    leftSide.connected = true;
  })

  socket.on('rightSide', (info) => {
    console.log(info),
    rightSide.connected = true;
  })
})
