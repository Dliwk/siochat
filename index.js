const express = require('express');
const http = require('http');
const sio = require('socket.io');

const app = express()
const server = http.createServer(app);
const io = new sio.Server(server);

app.get('/', (req, res) => {
   res.sendFile(__dirname + "/index.html");
});

server.listen(8080, () => {
   console.log('listening on *:8080');
});

io.on('connection', (socket) => {
   // socket.broadcast.emit('new client connected');
   socket.on('chat message', (user, msg) => {
      console.log('new message: ' + msg);
      io.emit('chat message', user ?? 'unknown', msg);
   });
})