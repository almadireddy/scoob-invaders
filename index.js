const express = require("express");
const app = express();

const server = require('http').Server(app);
const io = require("socket.io")(server);

const LEFT = "leftSide";
const RIGHT = "rightSide";

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

  // Ready Status messages
  if (packet.type === "readyMessage") {
    console.log(`received ready from ${fromSide}`)
    if (fromSide === LEFT) {
      leftReady = true;
    } else if (fromSide === RIGHT) {
      rightReady = true;
    }

    if (leftReady && rightReady) {
      let message = {
        type: "readyReply",
        status: "ready"
      }

      io.emit(LEFT, message);
      io.emit(RIGHT, message);
    }
    return;
  }

  if (packet.type === "hitPlayer") {
    if (fromSide === RIGHT) {
      packet.increment = "leftSide"
    } else {
      packet.increment = "rightSide"
    }

    io.emit(RIGHT, packet);
    io.emit(LEFT, packet);
    
    return
  }

  if (fromSide === LEFT) {
    packet.messageFromServer = "message from left"
    io.emit(RIGHT, packet);
  } 
  else if (fromSide === RIGHT) {
    packet.messageFromServer = "message from right"
    io.emit(LEFT, packet)
  }
}

let leftReady = false;
let rightReady = false;

let numberOfClients = 0;

io.on('connection', socket => {
  console.log("a user connected.");
  numberOfClients++; 
  console.log(numberOfClients)

  socket.on(LEFT, (packet) => {
    packetHandler(packet, LEFT)
  });

  socket.on(RIGHT, (packet) => {
    packetHandler(packet, RIGHT)
  });

  socket.on('disconnect', () => { 
    console.log("a user disconnected.");
    numberOfClients--; 
    console.log(numberOfClients);
    if (numberOfClients == 0) {
      leftReady = false;
      rightReady = false;
    }
  });
})

