var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var game = require(__dirname + '/game');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  socket.emit('players', game.getShips());

  ship = game.createNewShip(socket.id);
  socket.emit('init', ship);
  socket.broadcast.emit('new-player', ship);

  socket.on('loc-update', function (data) {
    game.updateShip(data);
    socket.broadcast.emit('loc-change', data);
  });

  socket.on('disconnect', function () {
    game.deleteShip(socket.id);
    socket.broadcast.emit('player-disconnect', socket.id);
  });
});

server.listen(process.env.PORT || 5000, function () {
  console.log('Example app listening');
});
