const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.get('/', (req, res) => {
  res.send('Hello from backend. ');
});
let chat = [];
io.on('connection', (socket) => {
  console.log('a user is connected');
  socket.on('messageE', (data) => {
    console.log(data);
    chat.push(data.msg);
    io.emit('messageR', chat);
  });

  socket.on('disconnect', (reason) => console.log('user disconnected'));
});

httpServer.listen(5000, () => {
  console.log('Server running on port 5000');
});
