const net = require("net");

const server = net.createServer((socket) => {
  console.log("Client connected...");
});

server.listen(8379, () => console.log("Custom Redis Server started on port 8379"));
