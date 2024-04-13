const net = require("net");
const RedisParser = require("redis-parser");
const commandHandler = require("./commandHandler");

const server = net.createServer((socket) => {
  console.log("Client connected...");

  socket.on("data", (dataBuffer) => {
    const redisParser = new RedisParser({
      returnError: (error) => {
        console.log("Error:", error);
      },
      returnReply: (msg) => {
        console.log("Received:", msg);
        const result = commandHandler(msg);
        console.log("Result:", result);
      },
    });

    redisParser.execute(dataBuffer);

    // socket.write("+OK\r\n");
  });
});

server.listen(8379, () => console.log("Custom Redis Server started on port 8379"));
