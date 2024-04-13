const net = require("net");

const server = net.createServer((socket) => {
  console.log("Client connected...");

  socket.on("data", (dataBuffer) => {
    console.log("Received:", dataBuffer.toString());
    socket.write("+OK\r\n");
  });
});

server.listen(8379, () => console.log("Custom Redis Server started on port 8379"));
