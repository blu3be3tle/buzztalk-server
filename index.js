const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.js'));
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('send_message', (data) => {
    console.log(data);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('SERVER RUNNING');
});
