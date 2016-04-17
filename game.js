var cars = {};
var starPos = {};

Math.getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

this.starInit = function() {
  starPos = {
    x: Math.getRandomInt(-400, 400),
    y: Math.getRandomInt(-400, 400),
    z: Math.getRandomInt(-400, 400)
  }
}

this.getStar = function() {
  return starPos;
}

this.createNewCar = function(id) {
  var car = {
    id: id,
    type: Math.getRandomInt(1, 11),
    loc: {
      pos: {
        x: 0,
        y: 0,
        z: 0
      },
      rot: {
        x: 0,
        y: 0,
        z: 0
      }
    }
  }
  cars[id] = car;
  return car;
}

this.deleteCar = function(id) {
  cars[id] = {};
  delete cars[id];
}

this.getCars = function() {
  return cars;
}

this.getCar = function(id) {
  return cars[id];
}

this.updateCar = function(car) {
  if (car == undefined || car.id == undefined || cars[car.id] == undefined) {
    return;
  }
  cars[car.id] = car;
}
