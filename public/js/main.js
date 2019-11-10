let selectedSide = "rightSide";
let firstClick = false;

let radios = document.sideSelector.side;
for (const r of radios) {
  r.addEventListener("change", (e) => {
    selectedSide = e.target.value;
  })
}

let socket = io(`http://localhost:8080`);

let selectSideButton = document.querySelector("button");
selectSideButton.onclick = () => {
  if (!firstClick) {
    socket.on(selectedSide, (packet) => {
      console.log(packet);
    })
    firstClick = true;
  }

  socket.emit(selectedSide, {
    message: `hey from the ${selectedSide}`,
    height: window.innerHeight,
    width: window.innerWidth
  })
}

socket.on("connect", () => {
  console.log("Successfully connected to server");
})
