const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
app.use(cors());

const io = require('socket.io')(process.env.PORT || 3000, {
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

  socket.on('send_message', (msg) => {
    socket.broadcast.emit('send_message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

Server.listen(3000, () => {
  console.log('SERVER RUNNING');
});
