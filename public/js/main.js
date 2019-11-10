
let socket = io(`http://localhost:8080`);

socket.on("connect", () => {
  console.log("Successfully connected to server");

  socket.emit("leftSide", {
    message: "hey from the left",
    height: window.innerHeight,
    width: window.innerWidth
  })
})
