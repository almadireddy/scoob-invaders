const express = require("express");
const app = express();

const server = require('http').Server(app);
const io = require("socket.io")(server);

server.listen(process.env.PORT || 8080);
app.use(express.static('public'));

let printInfo = (packet) => {
  console.log(packet.information);
}

let packetHandler = (packet, fromSide) => {
  if (packet.type === "info") {
    printInfo(packet);
    return;
  }

  if (fromSide === "leftSide") {
    packet.messageFromServer = "message from left"
    io.emit("rightSide", packet);
  } 
  else if (fromSide === "rightSide") {
    packet.messageFromServer = "message from right"
    io.emit("leftSide", packet)
  }
}

io.on('connection', socket => {
  console.log("a user connected.");

  socket.on("leftSide", (packet) => {
    packetHandler(packet, "leftSide")
  })

  socket.on('rightSide', (packet) => {
    packetHandler(packet, "rightSide")
  })
})
