var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var game = require(__dirname + '/game');
var stathat = require('stathat');

game.starInit();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/game', function (req, res) {
  res.sendFile(__dirname + '/game.html');
});

io.on('connection', function (socket) {
  socket.emit('players', game.getCars());

  if (process.env.PRODUCTION) {
    console.log("HALLO");
    stathat.trackEZCount("thedeadlybutter+ld35@gmail.com", "user connected", 1, function(status, json) {console.log("UH", status, json)});
  }

  car = game.createNewCar(socket.id);
  socket.emit('init', car);
  socket.emit('star-pos', game.getStar());
  socket.broadcast.emit('new-player', car);

  socket.on('loc-update', function (data) {
    var car = game.getCar(socket.id);
    if (car.type != data.type) {
      socket.broadcast.emit('car-change', data);
    }

    game.updateCar(data);
    socket.broadcast.emit('loc-change', data);
  });

  socket.on('disconnect', function () {
    game.deleteCar(socket.id);
    socket.broadcast.emit('player-disconnect', socket.id);
  });

  socket.on('got-star', function (data) {
    game.starInit();
    io.emit('star-pos', game.getStar());
  });
});

server.listen(process.env.PORT || 5000, function () {
  console.log('Example app listening');
});
