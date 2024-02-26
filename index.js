/* const express = require("express");
const app = express();

const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// I'm Working on
 */

const express = require("express");
// http server
const { createServer } = require("node:http");
// const http = require("http");
// const path = require("path");
const { join } = require("node:path");

// socket io server property for server side
const { Server } = require("socket.io");

const app = express();
const expressServer = createServer(app);
// const server = http.createServer(app)

/* Create a new object instance by using "Server" class &  Pass the expressServer into its constructor parameter */
const io = new Server(expressServer, {
  connectionStateRecovery: {},
});

// app.use(express.static(path.resolve("./public")));

// Create NameSpance & broadcast to everyone

/* const buyNsp = io.of("/buy");
buyNsp.on("connection", (socket) => {
  buyNsp.emit("myBroadcast", "hello from buy");
});

const sellNsp = io.of("/sell");
sellNsp.on("connection", (socket) => {
  sellNsp.emit("myBroadcast", "hello from sell");
}); */

// Socket io
io.on("connection", (socket) => {
  // Get to know while connecting
  console.log("a user connected", socket.id);

  // Broadcasting data to all
  io.sockets.emit("myBroadcast", "hello Everyone io");

  // socket.broadcast.emit("myBroadcast", "hello 500");

  // Send data from server to client(Throw)
  /* setTimeout(() => {
    socket.send("Hello! Welcome to our arena 🙌");
  }, 5000); */

  // Show time from server to client real time
  setInterval(() => {
    const callDataObj = new Date();
    const time = callDataObj.toLocaleTimeString();
    /* Using socket send method  */
    // socket.send(time);

    /* Using emit method with custom event name  */
    socket.emit("currentTime", time);
  }, 1000);

  // Catch data from client
  socket.on("chat message", (msg) => {
    // console.log("message: " + msg);

    // Throw this message & send it to client to show
    io.emit("chat refer", msg);
  });

  // Get to know while disconnecting
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/", (req, res) => {
  /* Connect index.html file from a folder */
  // return res.sendFile("/public/index.html");

  /* Connect index.html file by join method */
  // return res.sendFile(join(__dirname, "index.html"));

  /* Connect index.html file by simply */
  return res.sendFile(__dirname + "/index.html");
});

expressServer.listen(3000, () => {
  console.log(`Server is running at PORT: 3000`);
});
