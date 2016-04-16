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
  ship = game.createNewShip();
  
  socket.emit('init', ship);
  socket.emit('players', game.getShips());
  socket.broadcast.emit('new-player', ship);

  // socket.on('my other event', function (data) {
  //   console.log(data);
  // });

  socket.on('disconnect', function () {
    game.deleteShip(ship.id);
    io.emit('player-disconnect', ship.id);
  });
});

server.listen(process.env.PORT || 5000, function () {
  console.log('Example app listening');
});

// save online players, position + rotation + scale (Location obj?)
// when player connects, create Location obj + send them existing players & tell other players
// when player disconnects, discard Location obj & tell other players
// when player moves/rotates/scales (onLocationChange), update Location obj & tell other players
