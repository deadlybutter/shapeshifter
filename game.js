var ships = {};

function makeId() {
  return Math.random().toString(36).substring(7);
}

this.createNewShip = function() {
  var id = makeId();
  var ship = {
    id: id,
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
      },
      scale: {
        x: 1,
        y: 1,
        z: 1
      }
    }
  }
  ships[id] = ship;

  return ship;
}

this.deleteShip = function(id) {
  delete ships[id];
}

this.getShips = function() {
  return ships;
}
