const net = require("net");
const RedisParser = require("redis-parser");
const MessageHandler = require("./commandHandler");

const server = net.createServer((socket) => {
  console.log("Client connected...");
  const messageHandler = new MessageHandler();

  socket.on("data", (dataBuffer) => {
    const redisParser = new RedisParser({
      returnError: (error) => {
        console.log("Error:", error);
      },
      returnReply: (msg) => {
        console.log("Received:", msg);
        const response = messageHandler.handleMessage(msg);
        console.log("Response:", response);
        socket.write(response);
      },
    });
    redisParser.execute(dataBuffer);
  });
});

server.listen(8379, () => console.log("Custom Redis Server started on port 8379"));
